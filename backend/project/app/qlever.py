# This helper class is used to interact with the Wikidata API
import requests
import json
from typing import List
import datetime

class QleverAPI:
    def __init__(self):
        self.endpoint_url = "https://qlever.cs.uni-freiburg.de/api/wikidata"
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
        
    def film_pattern_query(self, pattern, limit):

        pattern = pattern.lower()
        # remove spaces from the pattern
        pattern = pattern.replace(" ", "")

        SPARQL = f"""
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            SELECT DISTINCT ?film ?filmLabel ?filmId WHERE {{
                {{
                    SELECT ?film ?filmLabel ?filmId (1 as ?order) WHERE {{
                        ?film wdt:P31 wd:Q11424;
                            rdfs:label ?filmLabel.
                        FILTER(LANG(?filmLabel) = "en")
                        FILTER(STRSTARTS(REPLACE(LCASE(?filmLabel), " ", ""), "{pattern}"))
                    }}
                }}
                UNION
                {{
                    SELECT ?film ?filmLabel ?filmId (2 as ?order) WHERE {{
                        ?film wdt:P31 wd:Q11424;
                            rdfs:label ?filmLabel.
                        FILTER(LANG(?filmLabel) = "en")
                        BIND(REPLACE(LCASE(?filmLabel), " ", "") AS ?formattedLabel)
                        FILTER(REGEX(?formattedLabel, "{pattern}", "i"))
                        FILTER (!STRSTARTS(REPLACE(LCASE(?filmLabel), " ", ""), "{pattern}"))
                    }}
                }}
            }}
            ORDER BY ?order
            LIMIT {limit}
        """

        print(SPARQL)

        results = self.execute_query(SPARQL)
        
        return results
    
    def recently_released_films(self, limit):
        current_time = datetime.datetime.now().isoformat()
        # convert it to "2024-12-05T00:00:00Z"
        current_time = current_time.split(".")[0] + "Z"

        SPARQL = f"""
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX wd: <http://www.wikidata.org/entity/>
            PREFIX wdt: <http://www.wikidata.org/prop/direct/>
            SELECT DISTINCT ?film ?filmLabel (MIN(?publicationDate) as ?earliestPublicationDate) WHERE {{
            ?film wdt:P31 wd:Q11424;                  # Instance of film
            wdt:P577 ?publicationDate;         # Publication date
            rdfs:label ?filmLabel.             # Label of the film
            FILTER(LANG(?filmLabel) = "en")          # Filter out non-English labels
            FILTER(!isBLANK(?publicationDate))       # Exclude films with unknown publication dates
            FILTER(?publicationDate < "{current_time}"^^xsd:dateTime)        # Exclude films that are set to be released in the future or have a placeholder date like 2024-01-01
            }}
            GROUP BY ?film ?filmLabel
            ORDER BY DESC(?earliestPublicationDate)
            LIMIT {limit}
        """

        print(SPARQL)

        results = self.execute_query(SPARQL)
        
        return results
    

