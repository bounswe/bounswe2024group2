
from django.conf import settings
from django.urls import reverse
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from marketfeed.models import *
from unittest.mock import patch

class CurrencyViewSetTest(APITestCase):
    
    def setUp(self):
        self.currency_url = reverse('currency-list')  # Adjust this to match your URL pattern
        self.currency_data = {'name': 'US Dollar', 'code': 'USD'}
        self.invalid_currency_data = {'name': 'INVALID', 'code': ''}

        # Create a currency object for testing update and delete
        self.currency = Currency.objects.create(name='Euro', code='EUR')

    def test_list_currencies(self):
        response = self.client.get(self.currency_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assuming one currency was created in setUp

    def test_create_currency(self):
        response = self.client.post(self.currency_url, self.currency_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], self.currency_data['name'])
        self.assertEqual(response.data['code'], self.currency_data['code'])
        self.assertTrue(Currency.objects.filter(code=self.valid_user_data['code']).exists())

    def test_create_invalid_currency(self):
        response = self.client.post(self.currency_url, self.invalid_currency_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_currency(self):
        url = reverse('currency-detail', kwargs={'pk': self.currency.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.currency.name)

    def test_update_currency(self):
        url = reverse('currency-detail', kwargs={'pk': self.currency.pk})
        updated_data = {'name': 'British Pound', 'code': 'GBP'}
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], updated_data['name'])
        self.assertEqual(response.data['code'], updated_data['code'])

    def test_delete_currency(self):
        url = reverse('currency-detail', kwargs={'pk': self.currency.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Currency.objects.filter(pk=self.currency.pk).exists())

class StockViewSetTest(APITestCase):
    
    def setUp(self):
        self.currency = Currency.objects.create(name='Euro', code='EUR')
        self.stock_data = {
            'name': 'Test Stock',
            'symbol': 'MSFT',
            'currency': self.currency.pk
        }
        self.stock = Stock.objects.create(
            name='Test Stock', symbol='TS', currency=self.currency
        )
        self.stock_url = reverse('stock-list')  # Adjust this to match your URL pattern

    def test_list_stocks(self):
        response = self.client.get(self.stock_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assuming one stock was created in setUp

    @patch.object(yf.Ticker, 'history', return_value=[])
    def test_retrieve_stock(self, mock_history):
        url = reverse('stock-detail', kwargs={'pk': self.stock.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['symbol'], self.stock.symbol)

    def test_create_stock(self):
        response = self.client.post(self.stock_url, self.stock_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], self.stock_data['name'])
        self.assertEqual(response.data['symbol'], self.stock_data['symbol'])

    def test_create_invalid_stock(self):
        invalid_data = {'name': '', 'symbol': 'INV', 'currency': self.currency.pk}
        response = self.client.post(self.stock_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_stock(self):
        url = reverse('stock-detail', kwargs={'pk': self.stock.pk})
        updated_data = {'name': 'Updated Stock', 'symbol': 'US'}
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], updated_data['name'])
        self.assertEqual(response.data['symbol'], updated_data['symbol'])

    def test_delete_stock(self):
        url = reverse('stock-detail', kwargs={'pk': self.stock.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Stock.objects.filter(pk=self.stock.pk).exists())

    def test_stock_pattern_search(self):
        url = reverse('stock-search')
        response = self.client.post(url, {'pattern': 'T', 'limit': 10}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)  # Should return matching stock data
