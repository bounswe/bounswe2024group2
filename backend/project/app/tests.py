from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
import json

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
