import requests
import os,dotenv 
from dotenv import load_dotenv
load_dotenv()
omdb_api_key = os.getenv('OMDB_API_KEY')

def get_movie_details(imdb_id, api_key:str=omdb_api_key):
    url = f"http://www.omdbapi.com/?i={imdb_id}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print("-----")
        print(data)
        print("-----")
        details = {}
        if 'Ratings' in data:
            for rating in data['Ratings']:
                if rating['Source'] == 'Rotten Tomatoes':
                    details['rotten_rating'] = rating['Value']
        if 'Poster' in data:
            details['Poster URL'] = data['Poster']
        return details
    else:
        return None
    
