from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch
from rest_framework import status

class NewsViewTest(TestCase):
    def test_retieve_news_by_market_feed(self):
        url = reverse("news_feed")
        mock_feed_data = {
            "entries": [
                {
                    "title": "Mock Title",
                    "link": "https://mockurl.com",
                    "author": "Mock Author",
                    "published": "Mock Published Date"
                }
            ]
        }

        with patch("feedparser.parse", return_value=mock_feed_data) as mock_parse:
            data = {"feed_name": "financial times"}
            response = self.client.post(url, data=data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]["title"], "Mock Title")
            self.assertEqual(response.data[0]["link"], "https://mockurl.com")
            self.assertEqual(response.data[0]["author"], "Mock Author")
            self.assertEqual(response.data[0]["published"], "Mock Published Date")
            mock_parse.assert_called_once_with("https://www.ft.com/rss/home")
    