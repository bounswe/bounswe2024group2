import json
from django.core.management.base import BaseCommand
from marketfeed.models import Stock, Currency
from django.conf import settings
import requests
import re

# Search whether the stock name has FON, FONU or BYF in it to pass those: they are not stocks
def notStock(stockName):
    return bool(re.search(r'\b(FON|FONU|BYF)\b', stockName, re.IGNORECASE))

class Command(BaseCommand):
    help = 'Update or Insert the Turkish stock market stocks to db'
    

    def handle(self, *args, **kwargs):
        # Url to fetch stock list
        url = 'https://bigpara.hurriyet.com.tr/api/v1/hisse/list'
        try: 
            response = requests.get(url)
            response.raise_for_status()
            stocks = response.json().get('data', [])
            # name, symbol, currency
            currency = Currency.objects.get(code='TRY')
            for stock in stocks:
                try:
                    if notStock(stock['ad']):
                        continue
                    Stock.objects.update_or_create(
                        symbol=stock['kod'],  
                        defaults={
                            'name': stock['ad'], 
                            'currency': currency, 
                        }
                    )
                except Exception as e:
                    print(e)
              # Output the result           
        except Exception as e:
            print(e)