import unittest
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from onboarding.models import User, Profile  # Adjust import path if necessary
from unittest.mock import patch

class RegisterViewTest(APITestCase):
    def setUp(self):
        self.register_url = reverse('auth_register')
        self.valid_user_data = {
            'username': 'registertestuser',
            'email': 'registertestuser@gmail.com',
            'password': 'Password123*'
        }
        self.invalid_user_data = {
            'username': '',
            'email': 'invalidemail',
            'password': 'short'
        }

    @patch('onboarding.utils.Util.send_email')
    def test_register_valid_user(self, mock_send_email):

        response = self.client.post(self.register_url, self.valid_user_data)

        # Assert the response is created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check the response data
        self.assertEqual(response.data['username'], self.valid_user_data['username'])
        self.assertEqual(response.data['email'], self.valid_user_data['email'])

        # Assert the user was created
        self.assertTrue(User.objects.filter(email=self.valid_user_data['email']).exists())

        # Assert email was sent
        mock_send_email.assert_called_once()
        email_data = mock_send_email.call_args[0][0]
        self.assertEqual(email_data['to_email'], self.valid_user_data['email'])
        self.assertIn('Click here to verify your email.', email_data['html_message'])

    def test_register_invalid_user(self):

        response = self.client.post(self.register_url, self.invalid_user_data)

        # Assert the response is bad request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Assert no user was created
        self.assertFalse(User.objects.filter(email=self.invalid_user_data['email']).exists())

class VerifyEmailTest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="verifyemailtestuser",
            email="verifyemailtestuser@gmail.com",
            password="Password123*",
            is_verified=False
        )
        self.verify_email_url = reverse('email-verify')

        # Generate valid token
        self.valid_token = jwt.encode(
            {'user_id': self.user.id, 'exp': datetime.utcnow() + timedelta(minutes=5)},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        # Generate expired token
        self.expired_token = jwt.encode(
            {'user_id': self.user.id, 'exp': datetime.utcnow() - timedelta(minutes=5)},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        # Generate invalid token
        self.invalid_token = "invalid.token.string"

    def test_verify_email_with_valid_token(self):

        response = self.client.get(self.verify_email_url, {'token': self.valid_token})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'Successfully activated')
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified)

    def test_verify_email_with_expired_token(self):

        response = self.client.get(self.verify_email_url, {'token': self.expired_token})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Activation Expired')
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified)

    def test_verify_email_with_invalid_token(self):

        response = self.client.get(self.verify_email_url, {'token': self.invalid_token})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid token')
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified)

    def test_verify_email_already_verified(self):

        self.user.is_verified = True
        self.user.save()
        response = self.client.get(self.verify_email_url, {'token': self.valid_token})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Email already verified')

from rest_framework_simplejwt.tokens import RefreshToken

class MyObtainTokenPairViewTest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="logintestuser",
            email="logintestuser@example.com",
            password="Password123*"
        )
        self.token_url = reverse('token_obtain_pair')
        self.valid_credentials = {
            'username': 'logintestuser',
            'password': 'Password123*'
        }
        self.invalid_credentials = {
            'username': 'logintestuser',
            'password': 'wrongpassword'
        }

    def test_get_token_with_valid_credentials(self):
        response = self.client.post(self.token_url, self.valid_credentials)

        # Assert the response status
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert the response contains the access and refresh tokens
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

        token = RefreshToken(response.data['refresh'])
        self.assertEqual(token['user_id'], self.user.id)


class UserViewSetTest(APITestCase):
    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(
            username="user1",
            email="user1@example.com",
            password="password123"
        )
        self.user2 = User.objects.create_user(
            username="user2",
            email="user2@example.com",
            password="password123"
        )
        self.create_user_data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "strongpassword"
        }
        self.update_user_data = {
            "username": "updateduser",
            "email": "updateduser@example.com"
        }
        self.user_list_url = reverse('user-list')
        self.user_detail_url = lambda pk: reverse('user-detail', args=[pk])  # User detail endpoint
        self.get_by_username_url = lambda username: f"{self.user_list_url}by-username/{username}/"

    def test_list_users(self):

        response = self.client.get(self.user_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_user(self):

        response = self.client.get(self.user_detail_url(self.user1.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user1.username)
        self.assertEqual(response.data['email'], self.user1.email)

    def test_create_user(self):

        response = self.client.post(self.user_list_url, self.create_user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], self.create_user_data['username'])
        self.assertTrue(User.objects.filter(username=self.create_user_data['username']).exists())

    def test_update_user(self):

        response = self.client.put(self.user_detail_url(self.user1.id), self.update_user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.update_user_data['username'])
        self.assertEqual(response.data['email'], self.update_user_data['email'])

    def test_delete_user(self):

        response = self.client.delete(self.user_detail_url(self.user1.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(id=self.user1.id).exists())

    def test_get_user_by_username_success(self):

        response = self.client.get(self.get_by_username_url(self.user1.username))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user1.username)

    def test_get_user_by_username_not_found(self):

        response = self.client.get(self.get_by_username_url("nonexistentuser"))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found')


class LogoutViewTest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="logouttestuser",
            email="logouttestuser@example.com",
            password="Password123*"
        )
        self.client.login(username="logouttestuser", password="password123")

        # Generate tokens for the test user
        self.refresh_token = str(RefreshToken.for_user(self.user))
        self.access_token = str(RefreshToken.for_user(self.user).access_token)

        self.logout_url = reverse('logout')

    def test_successful_logout(self):

        response = self.client.post(
            self.logout_url,
            {"refreshToken": self.refresh_token},
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        # Assert the response status
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        self.assertEqual(response.data["message"], "Successfully logged out.")

    def test_logout_without_refresh_token(self):

        response = self.client.post(
            self.logout_url,
            {},
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        # Assert the response status
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("refreshToken", response.data)

class ProfileViewSetTest(APITestCase):
    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(
            username="profiletestuser1",
            email="profiletestuser1@example.com",
            password="Password123*"
        )
        self.user2 = User.objects.create_user(
            username="profiletestuser2",
            email="profiletestuser2@example.com",
            password="Password123*"
        )
        self.client.force_authenticate(user=self.user1)  # Authenticate as user1

        # Create test profiles
        self.profile1, _ = Profile.objects.get_or_create(
            user=self.user1, defaults={"bio": "Test bio 1", "location": "Location 1"}
        )
        self.profile2, _ = Profile.objects.get_or_create(
            user=self.user2, defaults={"bio": "Test bio 2", "location": "Location 2"}
        )

        # URL endpoints
        self.profile_list_url = reverse('profile-list')
        self.profile_detail_url = lambda pk: reverse('profile-detail', args=[pk])

    def test_list_profiles(self):

        response = self.client.get(self.profile_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_profile(self):

        response = self.client.get(self.profile_detail_url(self.profile1.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], self.profile1.bio)
        self.assertEqual(response.data['location'], self.profile1.location)
    '''
    def test_create_profile(self):

        Profile.objects.filter(user=self.user2).delete()

        new_profile_data = {
            "user": self.user2.id,
            "bio": "New test bio",
            "location": "New location"
        }
        response = self.client.post(self.profile_list_url, new_profile_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['bio'], new_profile_data['bio'])
        self.assertEqual(response.data['location'], new_profile_data['location'])
    '''
    def test_update_profile(self):

        updated_profile_data = {
            "user": self.user1.id,
            "bio": "Updated test bio",
            "location": "Updated location"
        }
        response = self.client.put(self.profile_detail_url(self.profile1.id), updated_profile_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], updated_profile_data['bio'])
        self.assertEqual(response.data['location'], updated_profile_data['location'])

    def test_delete_profile(self):

        response = self.client.delete(self.profile_detail_url(self.profile1.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Profile.objects.filter(id=self.profile1.id).exists())

#User = get_user_model()

from rest_framework_simplejwt.tokens import RefreshToken

class FollowUnfollowViewTest(APITestCase):
    def setUp(self):
        # Create users
        self.user1 = User.objects.create_user(username="user1", password="Password123*")
        self.user2 = User.objects.create_user(username="user2", password="Password123*")

        # Ensure profiles are created
        self.profile1, _ = Profile.objects.get_or_create(user=self.user1)
        self.profile2, _ = Profile.objects.get_or_create(user=self.user2)

        # Authenticate using JWT token
        refresh = RefreshToken.for_user(self.user1)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        # URLs for follow and unfollow
        self.follow_url = '/follow/'
        self.unfollow_url = '/unfollow/'


    def test_follow_user_success(self):

        response = self.client.post(self.follow_url, {'username': 'user2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Successfully followed user2.')
        self.assertIn(self.profile1, self.profile2.followers.all())

    def test_follow_user_already_following(self):

        self.profile2.followers.add(self.profile1)
        response = self.client.post(self.follow_url, {'username': 'user2'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Already following this user.')

    def test_follow_user_not_found(self):

        response = self.client.post(self.follow_url, {'username': 'nonexistentuser'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unfollow_user_success(self):

        self.profile2.followers.add(self.profile1)
        response = self.client.post(self.unfollow_url, {'username': 'user2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Successfully unfollowed user2.')
        self.assertNotIn(self.profile1, self.profile2.followers.all())

    def test_unfollow_user_not_following(self):

        response = self.client.post(self.unfollow_url, {'username': 'user2'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'You are not following this user.')

    def test_unfollow_user_not_found(self):

        response = self.client.post(self.unfollow_url, {'username': 'nonexistentuser'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
