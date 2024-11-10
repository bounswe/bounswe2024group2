import feedparser
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import NewsSerializer

class NewsView(generics.CreateAPIView):
    serializer_class = NewsSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feed_name = serializer.validated_data.get("feed_name").lower()

        urls = {
            "financial times": "https://www.ft.com/rss/home",
            "stock market": "https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=all-indices",
            "cryptocurrency": "https://cointelegraph.com/rss"
        }

        if feed_name not in urls:
            return Response(
                {"error": "Feed name not found. Available options are: 'financial times', 'stock market', 'cryptocurrency'."},
                status=status.HTTP_404_NOT_FOUND
            )

        url = urls[feed_name]
        feed = feedparser.parse(url)

        response = []
        for entry in feed.entries:
            response_entry = {
                    "title": entry.get("title", "No title available"),
                    "link": entry.get("link", "#"),
                    "author": entry.get("author", "Unknown"),
                    "published": entry.get("published", "No publish date available")
                }
            response.append(response_entry)

        return Response(response, status=status.HTTP_200_OK)