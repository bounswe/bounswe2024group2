import json
from django.core.management.base import BaseCommand
from marketfeed.models import Currency
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Update or Insert the supported currencies to db'
    print("currency command")
    def handle(self, *args, **kwargs):
        # Define the file path (assuming it's inside a 'currency_data' folder)
        file_path = os.path.join(settings.BASE_DIR,'marketfeed', 'management', 'currencies.json')
        print("currencies")
        # Check if the file exists
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'Currency data file not found: {file_path}'))
            return
        print("filepath", file_path)
        with open(file_path, 'r') as file:
            currencies_data = json.load(file)
            print(currencies_data)


        for currency_data in currencies_data:
            code = currency_data.get('code')
            name = currency_data.get('name')

            # Get or create the currency
            currency, created = Currency.objects.get_or_create(
                code=code,
                defaults={'name': name}
            )

            # Output the result
            if created:
                self.stdout.write(self.style.SUCCESS(f'Inserted {currency.code} into the database.'))
            else:
                self.stdout.write(self.style.SUCCESS(f'{currency.code} already exists in the database.'))
