from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
import json,os
from dotenv import load_dotenv
load_dotenv()
app_user_pass = os.getenv('APP_USER_PASS')
class TestDirectorDetailsEndpoint(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_director_details(self):
        url = '/get-director-details/'
        data = {
            "entity_id": "Q25191"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)[0]
        self.assertIn('name', response_data)
        self.assertIn('description', response_data)
        self.assertIn('image', response_data)
        self.assertIn('dob', response_data)
        self.assertIn('films', response_data)

class TestActorDetailsEndpoint(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_actor_details(self):
        url = '/get-actor-details/'
        data = {
            "entity_id": "Q38111"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)[0]
        self.assertIn('name', response_data)
        self.assertIn('description', response_data)
        self.assertIn('image', response_data)
        self.assertIn('dob', response_data)
        self.assertIn('films', response_data)

class TestFilmDetailsEndpoint(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_film_details(self):
        url = '/get-film-details/'
        data = {
            "entity_id": "Q108839994"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)[0]
        self.assertIn('label', response_data)
        self.assertIn('description', response_data)
        self.assertIn('image', response_data)
        self.assertIn('poster', response_data)
        self.assertIn('genres', response_data)
        self.assertIn('directors', response_data)
        self.assertIn('castMembers', response_data)


class TestLoginFunction(TestCase):
    def setUp(self):
        self.client = APIClient()


    def test_login_success(self):
        # Test case for successful login
        url='/login/'
        request_json = {
            "username": "irem17",
            "password": "{app_user_pass}"
        }
        response = self.client.post(url, request_json, format='json')
        print(response)
        self.assertTrue('access' in response)
        self.assertTrue('refresh' in response)


    def test_login_failure(self):
        # Test case for failed login
            
        url='/login/'
        request_json = {
            "username": "invalid_username",
            "password": "invalid_password"
        }
        """
            {
        "detail": "No active account found with the given credentials"
        }
        """
        response = self.client.post(url, request_json, format='json')
        self.assertTrue('detail' in response)   

class TestGetFilmInfo(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_film_info(self):
        # Test case for successful get film info
        url='/get-film-info/'   
        request_json = {
            "limit": 10,
        }
        """
        RESPONSE:
            {
        "id": "http://www.wikidata.org/entity/Q124370507",
        "label": "Thelma the Unicorn",
        "publicationDate": "2024-05-17T00:00:00Z",
        "genreLabel": "",
        "imdbID": "",
        "poster_url": "https://m.media-amazon.com/images/M/MV5BNDFmZGNhNjYtYjI2Ni00ZDIwLTlmOTItYjBjMDhiZWRiMjk5XkEyXkFqcGdeQXVyODAyNTM3NjQ@._V1_SX300.jpg",
        "rating": "No rating found"
        },
        """

        response = self.client.post(url, request_json, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = json.loads(response.content)
        self.assertEqual(len(response_data), 10)
        self.assertIn('id', response_data[0])
        self.assertIn('label', response_data[0])
        self.assertIn('publicationDate', response_data[0])
        self.assertIn('genreLabel', response_data[0])
        self.assertIn('imdbID', response_data[0])
        self.assertIn('poster_url', response_data[0])
        self.assertIn('rating', response_data[0])

