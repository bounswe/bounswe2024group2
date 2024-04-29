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
        
    def convert_entity_id(self, entity_id):
        if entity_id.startswith("http://www.wikidata.org/entity/"):
            return entity_id.split("/")[-1]
        return entity_id

    def get_label_of_entity(self, entity_id):

        entity_id = self.convert_entity_id(entity_id)

        query = f"""
        SELECT ?label WHERE {{
            wd:{entity_id} rdfs:label ?label .
            FILTER(LANG(?label) = "en")
            }}
        """
        response = self.execute_query(query)

        results = response['results']['bindings'] 
        return results[0]['label']['value'] if results else None
            
    def get_film_details(self, entity_id):

        entity_id = self.convert_entity_id(entity_id)

        query = f"""
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX schema: <http://schema.org/>
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            SELECT ?filmLabel ?description ?image (GROUP_CONCAT(DISTINCT ?director; separator=", ") AS ?directorIds) (GROUP_CONCAT(DISTINCT ?castMember; separator=", ") AS ?castMemberIds) ?duration (GROUP_CONCAT(DISTINCT ?genre; separator=", ") AS ?genreIds) WHERE {{
            VALUES ?film {{ wd:{entity_id} }} 
            ?film wdt:P31 wd:Q11424;
                    rdfs:label ?filmLabel FILTER(LANG(?filmLabel) = "en")
                    OPTIONAL {{ ?film wdt:P18 ?image. }}
                    OPTIONAL {{ ?film wdt:P57 ?director. }}
                    OPTIONAL {{ ?film wdt:P161 ?castMember. }}
                    OPTIONAL {{ ?film wdt:P2047 ?duration. }}
                    OPTIONAL {{ ?film wdt:P136 ?genre. }}
                    OPTIONAL {{ ?film schema:description ?description FILTER(LANG(?description) = "en"). }}
            }}
            GROUP BY ?filmLabel ?description ?image ?duration
            LIMIT 1
        """
        response = self.execute_query(query)

        results = response['results']['bindings']
        details = []
        for result in results:
            detail = {
                'label': result['filmLabel']['value'],
                'description': result['description']['value'],
                'image': result['image']['value'] if 'image' in result else None,
                # put both id and the label for each genre
                'genres': [{'id': genreId, 'label': self.get_label_of_entity(genreId)} for genreId in result['genreIds']['value'].split(", ")] if 'genreIds' in result else None,
                'directors': [{'id': directorId, 'label': self.get_label_of_entity(directorId)} for directorId in result['directorIds']['value'].split(", ")] if 'directorIds' in result else None,
                'castMembers': [{'id': castMemberId, 'label': self.get_label_of_entity(castMemberId)} for castMemberId in result['castMemberIds']['value'].split(", ")] if 'castMemberIds' in result else None
            }
            details.append(detail)
        
        return details

