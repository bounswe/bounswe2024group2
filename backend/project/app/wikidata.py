# This helper class is used to interact with the Wikidata API
import requests
import json
from typing import List
from app.tmdb import TMDB
from app.scripts.omdb_api import get_movie_details
from datetime import datetime
import time

"""
NOTES FOR IDS 

HORROR --->  wd:Q200092
COMEDY ---> wd:Q157443
ACTION ---> wd:Q188473
DRAMA ---> Q1919632
ROMANCE ---> wd:Q1054574
SCIENCE FICTION ---> Q20656232
ANIMATION --->wd:Q202866
"""


class WikidataAPI:
    def __init__(self):
        self.endpoint_url = "https://query.wikidata.org/sparql"
        self.params = {
            "action": "wbsearchentities",
            "format": "json",
            "language": "en",
        }
        self.at_rate_limit = False
        self.rate_limit_wait = 2

    def wait_for_rate_limit(self):
        time.sleep(self.rate_limit_wait)

    # Send a semantic query to the Wikidata API
    def execute_query(self, query, rate_limit_cause = False):
        
        time.sleep(0.1)
        try:
            if self.at_rate_limit and not rate_limit_cause:
                print("Queued query due to rate limit")
                self.wait_for_rate_limit()
                return self.execute_query(query)
            
            # wait 30 ms
            response = requests.get(
                self.endpoint_url,
                params={'query': query, 'format': 'json'}
            )
            response.raise_for_status()
            print(response)
            self.at_rate_limit = False
            return response.json()
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            self.at_rate_limit = True
            if response.status_code == 429:
                self.wait_for_rate_limit()
                return self.execute_query(query , rate_limit_cause = True)
            return None
        
    def convert_entity_id(self, entity_id):
        if entity_id.startswith("http://www.wikidata.org/entity/"):
            return entity_id.split("/")[-1]
        return entity_id

    def get_label_of_entity(self, entity_id):
        
        try:
            entity_id = self.convert_entity_id(entity_id)

            query = f"""
            SELECT ?label WHERE {{
                wd:{entity_id} rdfs:label ?label .
                FILTER(LANG(?label) = "en")
                }}
            """
            response = self.execute_query(query)
            results = response['results']['bindings'] 
            print("resp", response)
            print("results" , results)

            return results[0]['label']['value'] if results else None
        
        except Exception as e:
            return None
        
            
    def get_film_details(self, entity_id):

        entity_id = self.convert_entity_id(entity_id)

        query = f"""
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX schema: <http://schema.org/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        SELECT ?filmLabel ?description ?image 
            (GROUP_CONCAT(DISTINCT ?director; separator=", ") AS ?directorIds)
            ?directorNames
            (GROUP_CONCAT(DISTINCT ?castMember; separator=", ") AS ?castMemberIds) 
            ?castMemberNames
            ?duration ?tmdb 
            (GROUP_CONCAT(DISTINCT ?genre; separator=", ") AS ?genreIds)
            ?genreNames
        WHERE {{
            VALUES ?film {{ wd:{entity_id} }} 
            ?film wdt:P31 wd:Q11424;
                rdfs:label ?filmLabel FILTER(LANG(?filmLabel) = "en").
            OPTIONAL {{ ?film wdt:P18 ?image. }}
            OPTIONAL {{ ?film wdt:P57 ?director. }}
            OPTIONAL {{ ?film wdt:P161 ?castMember. }}
            OPTIONAL {{ ?film wdt:P136 ?genre. }}
            
            OPTIONAL {{
                SELECT ?film (GROUP_CONCAT(DISTINCT ?directorLabel; separator=", ") AS ?directorNames)
                WHERE {{
                    ?film wdt:P57 ?director.
                    ?director rdfs:label ?directorLabel FILTER(LANG(?directorLabel) = "en").
                }}
                GROUP BY ?film
            }}

            OPTIONAL {{
                SELECT ?film (GROUP_CONCAT(DISTINCT ?castMemberLabel; separator=", ") AS ?castMemberNames)
                WHERE {{
                    ?film wdt:P161 ?castMember.
                    ?castMember rdfs:label ?castMemberLabel FILTER(LANG(?castMemberLabel) = "en").
                }}
                GROUP BY ?film
            }}

            OPTIONAL {{
                SELECT ?film (GROUP_CONCAT(DISTINCT ?genreLabel; separator=", ") AS ?genreNames)
                WHERE {{
                    ?film wdt:P136 ?genre.
                    ?genre rdfs:label ?genreLabel FILTER(LANG(?genreLabel) = "en").
                }}
                GROUP BY ?film
            }}
            
            OPTIONAL {{ ?film wdt:P2047 ?duration. }}
            OPTIONAL {{ ?film schema:description ?description FILTER(LANG(?description) = "en"). }}
            OPTIONAL {{ ?film wdt:P4947 ?tmdb. }}
        }}
        GROUP BY ?filmLabel ?description ?image ?directorNames ?castMemberNames ?genreNames ?duration ?tmdb
        LIMIT 1
        """

        print(query)
        response = self.execute_query(query)

        results = response['results']['bindings']
        details = []
        
        print(results)

        for result in results:
            genreIds = result['genreIds']['value'] if 'genreIds' in result else None
            directorIds = result['directorIds']['value'] if 'directorIds' in result else None
            castMemberIds = result['castMemberIds']['value'] if 'castMemberIds' in result else None
            directorNames = result['directorNames']['value'] if 'directorNames' in result else None
            genreNames = result['genreNames']['value'] if 'genreNames' in result else None
            castMemberNames = result['castMemberNames']['value'] if 'castMemberNames' in result else None
            # if sizes are not equal, then we have a problem
            genres = []
            directors = []
            castMembers = []

            if genreIds and genreNames and len(genreIds.split(", ")) != len(genreNames.split(", ")):
                print("Error: genreIds and genreNames have different sizes")
            else:
                genres = [{'id': genreId, 'label': genreName} for genreId, genreName in zip(genreIds.split(", "), genreNames.split(", "))] if genreIds else None

            if directorIds and directorNames and len(directorIds.split(", ")) != len(directorNames.split(", ")):
                print("Error: directorIds and directorNames have different sizes")
            else:
                directors = [{'id': directorId, 'label': directorName} for directorId, directorName in zip(directorIds.split(", "), directorNames.split(", "))] if directorIds else None

            if castMemberIds and castMemberNames and len(castMemberIds.split(", ")) != len(castMemberNames.split(", ")):
                print("Error: castMemberIds and castMemberNames have different sizes")
            else:
                castMembers = [{'id': castMemberId, 'label': castMemberName} for castMemberId, castMemberName in zip(castMemberIds.split(", "), castMemberNames.split(", "))] if castMemberIds else None
            

            if genreIds == None:
                genres = None
            if directorIds == None:
                directors = None
            if castMemberIds == None:
                castMembers = None
            
            tmdb = result['tmdb']['value'] if 'tmdb' in result else None

            tmdbManager = TMDB()
            if tmdb:
                poster = tmdbManager.get_movie_poster(tmdb)
            else:
                poster = None
            

            detail = {
                'label': result['filmLabel']['value'],
                'description': result['description']['value'],
                'image': result['image']['value'] if 'image' in result else None,
                'poster': poster,
                # put both id and the label for each genre
                # It should be none if there is no genre
                'genres': genres,
                'directors': directors,
                'castMembers': castMembers,
            }
            details.append(detail)
        
        return details
    def recently_released_and_info(self, limit):

        current_date = datetime.now().isoformat()

        # Define the limit for the number of results

        # SPARQL query
        SPARQL = f"""
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        SELECT ?film ?filmLabel (SAMPLE(?publicationDate) AS ?earliestPublicationDate) 
            (SAMPLE(?genreLabel) AS ?sampleGenreLabel) (SAMPLE(?imdbID) AS ?sampleImdbID) WHERE {{
            ?film wdt:P31 wd:Q11424;                  # Instance of film
                wdt:P364 wd:Q1860;                 # Original language is English
                wdt:P577 ?publicationDate;         # Publication date
                wdt:P136 ?genre;                   # Genre
                wdt:P345 ?imdbID;                  # IMDb ID

            FILTER (?publicationDate < "{current_date}"^^xsd:dateTime)     
            SERVICE wikibase:label {{
                bd:serviceParam wikibase:language "en".
                ?film rdfs:label ?filmLabel.
                ?genre rdfs:label ?genreLabel.
            }}
        }}
        GROUP BY ?film ?filmLabel
        ORDER BY DESC(?earliestPublicationDate)
        LIMIT {limit}
        """
        
        results = self.execute_query(SPARQL)
        print("heyyy ",results)
        i=0
        for result in results['results']['bindings']:
            imdbID=results['results']['bindings'][i]['sampleImdbID']['value']
            poster_url=get_movie_details(imdbID)['Poster URL'] if 'Poster URL' in get_movie_details(imdbID) else "No poster found"
            ratings=get_movie_details(imdbID)['rotten_rating'] if 'rotten_rating' in get_movie_details(imdbID) else "No rating found"
            print("poster url is ",poster_url)
            results['results']['bindings'][i]['poster_url']=poster_url
            results['results']['bindings'][i]['ratings']=ratings
            i+=1


        return results
    
    def get_films_by_genre(self,genre_name):
        endpoint_url = "https://query.wikidata.org/sparql"
        
        # Prepare the SPARQL query with the user-provided genre name
        query = f"""
        SELECT ?film ?filmLabel WHERE {{
        ?film wdt:P31 wd:Q11424;  # Films
                wdt:P136 ?genre.  # Genre of the film
        
        ?genre rdfs:label ?genreLabel.
        FILTER(CONTAINS(LCASE(?genreLabel), "{genre_name.lower()}"))
        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }}
        }} LIMIT 50
        """
        
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
            "Accept": "application/json"
        }
        
        params = {
            "query": query,
            "format": "json"
        }
        
        try:
            response = requests.get(endpoint_url, headers=headers, params=params)
            response.raise_for_status()  # Raises an HTTPError for bad responses
            data = response.json()
            
            # Extracting the films from the query results
            films = []
            for item in data["results"]["bindings"]:
                film_label = item["filmLabel"]["value"] if 'filmLabel' in item else "No label found"
                films.append(film_label)
            
            return films
        
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return []
    def get_director(self,name,surname:str=None):
        endpoint_url = "https://query.wikidata.org/sparql"
        """
        SELECT ?director ?directorLabel WHERE {
        ?director wdt:P106 wd:Q2526255.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        FILTER EXISTS {
            ?director rdfs:label ?directorLabel.
            FILTER(CONTAINS(LCASE(?directorLabel), "taran"))
        }
        } LIMIT 10
        """

        query = f"""
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?director ?directorLabel WHERE {{
            ?director wdt:P106 wd:Q2526255;
                    rdfs:label ?directorLabel.
            FILTER(LANG(?directorLabel) = "en" && CONTAINS(LCASE(?directorLabel), "{name.lower()}"))
}} LIMIT 50
"""

        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
            "Accept": "application/json"
        }

        params = {
            "query": query,
            "format": "json"
        }

        response=self.execute_query(query)
        print(response)

        return response


    def get_cast_member(self,name):

        endpoint_url = "https://query.wikidata.org/sparql"
        

        query = f"""
        SELECT ?cast ?castLabel WHERE {{
        ?cast wdt:P31 wd:Q33999;
                    rdfs:label ?castLabel.
        FILTER(CONTAINS(LCASE(?castLabel), "{name.lower()}"))
        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }}
        }} LIMIT 50
        """

        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
            "Accept": "application/json"
        }

        params = {
            "query": query,
            "format": "json"
        }

        try:
            response = requests.get(endpoint_url, headers=headers, params=params)
            response.raise_for_status()  # Raises an HTTPError for bad responses
            data = response.json()

            # Extracting the films from the query results
            cast = []
            for item in data["results"]["bindings"]:
                cast_label = item["castLabel"]["value"] if 'castLabel' in item else "No label found"
                cast.append(cast_label)

            return cast
        
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return []
        

    def get_director_details(self,entity_id):
        entity_id = self.convert_entity_id(entity_id)

        query = f"""
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX schema: <http://schema.org/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        SELECT ?director ?directorName ?directorDescription ?directorImage ?directorDOB 
            (GROUP_CONCAT(DISTINCT ?film; separator=", ") AS ?filmIds)
            (GROUP_CONCAT(DISTINCT ?filmLabel; separator=", ") AS ?filmNames)
        WHERE {{
            VALUES ?director {{ wd:{entity_id} }} 
            ?director rdfs:label ?directorName FILTER(LANG(?directorName) = "en").
            OPTIONAL {{ ?director schema:description ?directorDescription FILTER(LANG(?directorDescription) = "en"). }}
            OPTIONAL {{ ?director wdt:P18 ?directorImage. }}
            OPTIONAL {{ ?director wdt:P569 ?directorDOB. }}

            OPTIONAL {{
                ?film wdt:P57 ?director.
                ?film rdfs:label ?filmLabel FILTER(LANG(?filmLabel) = "en").
            }}
        }}
        GROUP BY ?director ?directorName ?directorDescription ?directorImage ?directorDOB
        LIMIT 1
        """
        print(query)
        response = self.execute_query(query)
        print(response)
        results = response['results']['bindings']
        details = []

        for result in results:
            filmIds = result['filmIds']['value'] if 'filmIds' in result else None
            filmNames = result['filmNames']['value'] if 'filmNames' in result else None
            films = [{'id': filmId, 'label': filmName} for filmId, filmName in zip(filmIds.split(", "), filmNames.split(", "))] if filmIds else None

            detail = {
                'name': result['directorName']['value'],
                'description': result['directorDescription']['value'] if 'directorDescription' in result else None,
                'image': result['directorImage']['value'] if 'directorImage' in result else None,
                'dob': result['directorDOB']['value'] if 'directorDOB' in result else None,
                'films': films
            }
            details.append(detail)

        return details


    def get_actor_details(self,entity_id):
        entity_id = self.convert_entity_id(entity_id)

        query = f"""
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX schema: <http://schema.org/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        SELECT ?castMember ?castMemberName ?castMemberDescription ?castMemberImage ?castMemberDOB 
            (GROUP_CONCAT(DISTINCT ?film; separator=", ") AS ?filmIds)
            (GROUP_CONCAT(DISTINCT ?filmLabel; separator=", ") AS ?filmNames)
        WHERE {{
            VALUES ?castMember {{ wd:{entity_id} }} 
            ?castMember rdfs:label ?castMemberName FILTER(LANG(?castMemberName) = "en").
            OPTIONAL {{ ?castMember schema:description ?castMemberDescription FILTER(LANG(?castMemberDescription) = "en"). }}
            OPTIONAL {{ ?castMember wdt:P18 ?castMemberImage. }}
            OPTIONAL {{ ?castMember wdt:P569 ?castMemberDOB. }}

            OPTIONAL {{
                ?film wdt:P161 ?castMember.
                ?film rdfs:label ?filmLabel FILTER(LANG(?filmLabel) = "en").
            }}
        }}
        GROUP BY ?castMember ?castMemberName ?castMemberDescription ?castMemberImage ?castMemberDOB
        LIMIT 1
        """
        response = self.execute_query(query)
        print(response)
        results = response['results']['bindings']
        details = []
        
        for result in results:
            filmIds = result['filmIds']['value'] if 'filmIds' in result else None
            filmNames = result['filmNames']['value'] if 'filmNames' in result else None
            films = [{'id': filmId, 'label': filmName} for filmId, filmName in zip(filmIds.split(", "), filmNames.split(", "))] if filmIds else None

            detail = {
                'name': result['castMemberName']['value'],
                'description': result['castMemberDescription']['value'] if 'castMemberDescription' in result else None,
                'image': result['castMemberImage']['value'] if 'castMemberImage' in result else None,
                'dob': result['castMemberDOB']['value'] if 'castMemberDOB' in result else None,
                'films': films
            }
            details.append(detail)

        return details
    

