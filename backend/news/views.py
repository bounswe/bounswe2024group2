import feedparser
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import NewsSerializer
from bs4 import BeautifulSoup

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
            if feed_name == "financial times":

                response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("author", "Financial Times"),
                        "published": entry.get("published", "No publish date available"),
                        "description": entry.get("summary", "No summary available"),
                        "image": entry.get("media_thumbnail")[0]['url'] if entry.get("media_thumbnail") and  len(entry.get("media_thumbnail")) > 0 else ""
                    }

            elif feed_name == "cryptocurrency":

                html_content = entry['summary_detail']['value']

                soup = BeautifulSoup(html_content, 'html.parser')

                paragraphs = soup.find_all('p')
                if len(paragraphs) > 1:
                    summary_text = paragraphs[1].get_text(strip=True)
                else:
                    summary_text = ''
                response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("author", "Unknown"),
                        "published": entry.get("published", "No publish date available"),
                        "description": summary_text,
                        "image": entry.get("media_content")[0]['url'] if entry.get("media_content") and  len(entry.get("media_content")) > 0 else ""
                    }

            response.append(response_entry)

        return Response(response, status=status.HTTP_200_OK)