from django.test import TestCase
from unittest.mock import patch, MagicMock
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate
from rest_framework import status
from .models import *
from .serializers import AnnotationSerializer
from .views import AnnotationViewSet
from django.contrib.auth.models import User
from django.urls import reverse
from django.conf import settings

class AnnotationViewSetIntegrationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        
        # Create related instances for Annotation
        self.body = Body.objects.create(
            type="TextualBody",
            value="This info is misleading imo",
            format="text/plain",
            language="en"
        )
        self.target = Target.objects.create(
            type="TextPositionSelector",
            start=10,
            end=50,
            source="http://example.com/posts/1"
        )
        self.creator = Creator.objects.create(
            type="Person",
            name="john"
        )
        self.annotation = Annotation.objects.create(
            body=self.body,
            target=self.target,
            creator=self.creator
        )
        self.client.login(username='testuser', password='testpassword')

    def test_create_annotation(self):
        """Test creating a new annotation."""
        url = reverse('annotation-list')
        data = {
            "body": {
                "type": "TextualBody",
                "value": "This info is misleading imo",
                "format": "text/plain",
                "language": "en"
            },
            "target": {
                "type": "TextPositionSelector",
                "start": 10,
                "end": 50,
                "source": "http://example.com/posts/1"
            },
            "creator": {
                "type": "Person",
                "name": "john"
            }
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["target"]["source"], data["target"]["source"])

    def test_get_annotations_by_source(self):
        """Test retrieving annotations by source."""
        url = reverse('annotation-get-by-posts', kwargs={"source": 1})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["target"]["source"], self.target.source)

    def test_get_annotations_by_source_not_found(self):
        """Test retrieving annotations by source when none are found."""
        url = reverse('annotation-get-by-posts', kwargs={"source": 999})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['message'], "No annotations found for the specified source.")