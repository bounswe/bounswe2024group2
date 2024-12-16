from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock
from django.urls import reverse
from django.contrib.auth.models import User
from .models import *
from .serializers import *
import requests

class PortfolioViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.portfolio = Portfolio.objects.create(name="Tech Portfolio", user_id=self.user)
        self.client.login(username="testuser", password="testpassword")

    def test_list_portfolios(self):
        url = reverse('portfolio-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class PostViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.post = Post.objects.create(title="Test Post", content="Test content", author=self.user)
        self.client.login(username="testuser", password="testpassword")

    def test_list_posts(self):
        url = reverse('post-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_post(self):
        url = reverse('post-detail', args=[self.post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_post(self):
        url = reverse('post-detail', args=[self.post.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)