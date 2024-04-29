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

class Wikidata:
    def __init__(self):
        self.url = "https://www.wikidata.org/w/api.php"
        self.params = {
            "action": "wbsearchentities",
            "format": "json",
            "language": "en",
        }

    # Send a semantic query to the Wikidata API
    def query(self, query: str) -> List[str]:
        self.params["search"] = query
        response = requests.get(url=self.url, params=self.params)
        data = response.json()
        return data["search"]
        
    

