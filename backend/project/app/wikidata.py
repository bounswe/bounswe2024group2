# This helper class is used to interact with the Wikidata API
import requests
import json
from typing import List

QUERY = """
SELECT ?item ?itemLabel ?itemDescription ?itemAltLabel WHERE {
    ?item wdt:P31 wd:Q11424.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
"""

class WikidataAPI:
    def __init__(self):
        self.endpoint_url = "https://query.wikidata.org/sparql"
        self.params = {
            "action": "wbsearchentities",
            "format": "json",
            "language": "en",
        }

    # Send a semantic query to the Wikidata API
    def execute_query(self, query):
        try:
            response = requests.get(
                self.endpoint_url,
                params={'query': query, 'format': 'json'}
            )
            response.raise_for_status()
            print(response)
            return response.json()
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            return None
        
    

