import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
import json
from django.conf import settings
import os
from marketfeed.serializers import *
from marketfeed.models import *

class Command(BaseCommand):
    help = 'Update or Insert the supported indices to db'

    def handle(self, *args, **kwargs):
        url = "https://www.kap.org.tr/en/Endeksler"
        
        file_path = os.path.join(settings.BASE_DIR,'marketfeed', 'management', 'indices.json')
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'Index data file not found: {file_path}'))
            return
        with open(file_path, 'r') as file:
            indices = json.load(file)
        response = requests.get(url)
        response.raise_for_status()  

        soup = BeautifulSoup(response.text, "html.parser")

        index_elements = soup.find_all("div", class_="vcell")

        for index_element in index_elements:
            index_name = index_element.text.strip()
            
            if index_name not in indices:
                continue
            # Get the index name
            next_div = index_element.find_next("div", class_="column-type7 wmargin")
            stock_symbols = []
            if next_div:
                stock_elements = next_div.find_all("div", class_="comp-cell _02 vtable")
                for stock_element in stock_elements:
                    stock_name = stock_element.find("a", class_="vcell").text.strip() if stock_element.find("a", class_="vcell") else None
            
                    if stock_name:
                        stock_symbols.append(stock_name)     
            
            stocks_in_index = Stock.objects.filter(symbol__in=stock_symbols)
            currency = Currency.objects.get(code='TRY')
            symbol = indices[index_name]
            

            try:
                index_obj, created = Index.objects.update_or_create(
                    name = index_name,
                    symbol = symbol,
                    currency = currency,
                    #stocks = stocks_in_index
                )
                
                index_obj.stocks.add(*stocks_in_index)
            except Exception as e:
                print(e)
                
            
            