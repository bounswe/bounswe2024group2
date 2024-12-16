import feedparser
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import NewsSerializer
from bs4 import BeautifulSoup
from html.parser import HTMLParser


class HTMLContentParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.image_url = None

    def handle_starttag(self, tag, attrs):
        if tag == "img" and self.image_url is None:
            for attr in attrs:
                if attr[0] == "src":
                    self.image_url = attr[1]


class NewsView(generics.CreateAPIView):
    serializer_class = NewsSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feed_name = serializer.validated_data.get("feed_name").lower()

        urls = {
            "financial times": "https://www.ft.com/rss/home",
            "cryptocurrency": "https://cointelegraph.com/rss",
            "comprehensive financial news": "http://feeds.benzinga.com/benzinga",
            "financeasia": "https://www.financeasia.com/rss/latest",
            "expert analysis": "https://moneyweek.com/feed/all",
            "turkey": "https://www.ntv.com.tr/ekonomi.rss",
        }

        if feed_name not in urls:
            return Response(
                {"error": f"Feed name not found. Available options are: {', '.join(urls.keys())}."},
                status=status.HTTP_404_NOT_FOUND,
            )

        url = urls[feed_name]
        try:
            feed = feedparser.parse(url)
            num_entries = 30
            entries = feed.entries[:num_entries] if num_entries else feed.entries
        except Exception as e:
            return Response({"error": f"Failed to fetch feed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response = []
        for entry in entries:
            try:
                if feed_name == "financial times":
                    response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("author", "Financial Times"),
                        "published": entry.get("published", "No publish date available"),
                        "description": entry.get("summary", "No summary available"),
                        "image": entry.get("media_thumbnail")[0]['url']
                        if entry.get("media_thumbnail") and len(entry.get("media_thumbnail")) > 0
                        else "",
                    }

                elif feed_name == "cryptocurrency":
                    html_content = entry['summary_detail']['value']
                    soup = BeautifulSoup(html_content, 'html.parser')
                    paragraphs = soup.find_all('p')
                    summary_text = paragraphs[1].get_text(strip=True) if len(paragraphs) > 1 else ''
                    response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("author", "Unknown"),
                        "published": entry.get("published", "No publish date available"),
                        "description": summary_text,
                        "image": entry.get("media_content")[0]['url']
                        if entry.get("media_content") and len(entry.get("media_content")) > 0
                        else "",
                    }

                elif feed_name == "comprehensive financial news":
                    media_content = entry.get("media_content", [])
                    image_url = media_content[0]["url"] if media_content and isinstance(media_content, list) else ""
                    response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("dc:creator", "Unknown"),
                        "published": entry.get("pubDate", "No publish date available"),
                        "description": BeautifulSoup(entry.get("description", ""), "html.parser").get_text(strip=True),
                        "image": image_url,
                    }

                elif feed_name == "financeasia":
                    raw_description = entry.get("description", "")
                    soup = BeautifulSoup(raw_description, "html.parser")
                    image_tag = soup.find("img")
                    image_url = image_tag["src"] if image_tag else ""
                    clean_description = soup.get_text(strip=True)
                    response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("author", "Unknown"),
                        "published": entry.get("pubDate", "No publish date available"),
                        "description": clean_description,
                        "image": image_url,
                    }

                elif feed_name == "expert analysis":
                    response_entry = {
                        "title": entry.title,
                        "link": entry.link,
                        "author": entry.get("author", "Unknown"),
                        "published": entry.published if "published" in entry else "Unknown",
                        "description": entry.description if "description" in entry else "",
                        "image": "",
                    }
                    if "enclosures" in entry:
                        for enclosure in entry.enclosures:
                            if enclosure.get("type", "").startswith("image/"):
                                response_entry["image"] = enclosure["url"]
                                break

                elif feed_name == "turkey":
                    content_list = entry.get("content", [])
                    content_html = content_list[0].get("value", "") if content_list and isinstance(content_list[0], dict) else ""
                    parser = HTMLContentParser()
                    parser.feed(content_html)
                    image_url = parser.image_url if parser.image_url else ""
                    soup = BeautifulSoup(content_html, "html.parser")
                    description_text = soup.get_text(separator="\n").strip()
                    response_entry = {
                        "title": entry.get("title", "No title available"),
                        "link": entry.get("link", "#"),
                        "author": entry.get("author", "NTV"),
                        "published": entry.get("published", "No publish date available"),
                        "description": description_text,
                        "image": image_url,
                    }

                else:
                    continue

                response.append(response_entry)

            except Exception as e:
                response.append({
                    "title": "Error parsing entry",
                    "error": str(e),
                })

        return Response(response, status=status.HTTP_200_OK)