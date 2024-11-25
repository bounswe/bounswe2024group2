import feedparser
from django.urls import reverse
from unittest.mock import patch
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase


class NewsViewTest(TestCase):
    def test_retieve_news_by_market_feed(self):
        url = reverse("news_feed")
        mock_feed_data = {
            "entries": [
                {
                    "title": "Mock Title",
                    "link": "https://mockurl.com",
                    "author": "Mock Author",
                    "published": "Mock Published Date"
                }
            ]
        }

        with patch("feedparser.parse", return_value=mock_feed_data) as mock_parse:
            data = {"feed_name": "financial times"}
            response = self.client.post(url, data=data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]["title"], "Mock Title")
            self.assertEqual(response.data[0]["link"], "https://mockurl.com")
            self.assertEqual(response.data[0]["author"], "Mock Author")
            self.assertEqual(response.data[0]["published"], "Mock Published Date")
            mock_parse.assert_called_once_with("https://www.ft.com/rss/home")


class NewsViewIntegrationTest(APITestCase):
    def setUp(self):
        self.url = reverse('news_feed')
        self.valid_feed_names = ["financial times", "stock market", "cryptocurrency"]

    def test_valid_feed_request(self):
        for feed_name in self.valid_feed_names:
            data = {"feed_name": feed_name}
            response = self.client.post(self.url, data=data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIsInstance(response.data, list)
            if response.data:
                self.assertIn("title", response.data[0])
                self.assertIn("link", response.data[0])
                self.assertIn("author", response.data[0])
                self.assertIn("published", response.data[0])

    def test_invalid_feed_request(self):
        data = {"feed_name": "invalid_feed"}
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
        self.assertEqual(
            response.data["error"],
            "Feed name not found. Available options are: 'financial times', 'stock market', 'cryptocurrency'."
        )

    def test_missing_feed_name(self):
        data = {}
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("feed_name", response.data) 