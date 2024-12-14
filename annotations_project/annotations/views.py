from rest_framework import viewsets
from .models import Annotation
from .serializers import AnnotationSerializer


"""
Example request:
POST /api/annotations/ HTTP/1.1
Content-Type: application/json

{
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
    "source": "http://159.223.28.163:30002/posts/1"
  },
  "creator": {
    "type": "Person",
    "name": "john"
  }
}
"""
class AnnotationViewSet(viewsets.ModelViewSet):
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer