from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Post, Like

class PostViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.post = Post.objects.create(title='Test Post', content='Test Content', film='Test Film', author=self.user)
        
    def test_get_all_posts(self):
        url = reverse('create_post')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], 'Test Post')

    def test_create_post(self):
        url = reverse('create_post')
        data = {'title': 'New Post', 'content': 'New Content', 'film': 'New Film'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_search_post(self):
        url = reverse('search-post', args=['Test'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Post')


class LikeViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.post = Post.objects.create(title='Test Post', content='Test Content', film='Test Film', author=self.user)
        self.like = Like.objects.create(user=self.user, post=self.post)

    def test_get_like(self):
        url = reverse('like-detail', args=[self.like._id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['post'], self.post._id)

    def test_create_like(self):
        url = reverse('create_like')
        data = {'post': self.post._id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_like_count(self):
        url = reverse('like-count', args=[self.post._id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['like_count'], 1)
