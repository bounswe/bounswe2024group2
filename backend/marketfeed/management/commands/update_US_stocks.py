from django.core.management.base import BaseCommand
from marketfeed.models import Stock, Currency
from django.conf import settings
import requests
import pandas as pd


class Command(BaseCommand):
    help = 'Update or Insert the Turkish stock market stocks to db'
    print("update stocks")

    def handle(self, *args, **kwargs):
        # Url to fetch stock list
                
        headers = {
            'authority': 'api.nasdaq.com',
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
            'origin': 'https://www.nasdaq.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.nasdaq.com/',
            'accept-language': 'en-US,en;q=0.9',
        }

        parameters = (
            ('tableonly', 'true'),
            ('limit', '25'),
            ('offset', '0'),
            ('download', 'true'),
        )

        
        try: 
            response = requests.get('https://api.nasdaq.com/api/screener/stocks', headers=headers, params=parameters)
            data = response.json()['data']
            stocks = pd.DataFrame(data['rows'], columns=data['headers'])
            stocks = stocks.drop(columns=['lastsale', 'netchange', 'pctchange', 'marketCap', 'country', 'ipoyear', 'volume','url'])

            currency = Currency.objects.get(code='USD')

            for indx,stock in stocks.iterrows():
                try:
                    Stock.objects.update_or_create(
                        symbol=stock['symbol'],  
                        defaults={
                            'name': stock['name'], 
                            'currency': currency, 
                        }
                    )
                except Exception as e:
                    print(e)
        except Exception as e:
            print(e)