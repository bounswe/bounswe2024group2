from rest_framework import viewsets
from .models import Annotation
from .serializers import AnnotationSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
from rest_framework import viewsets, status, permissions, generics


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

    @action(detail=False, methods=['get'], url_path='source/(?P<source>[^/.]+)')
    def get_by_posts(self, request, source=None):

        if not source:
            return Response({"error": "The 'source' query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        source_url = f"{settings.BACKEND_SERVICE_URL}/posts/{source}"

        annotations = Annotation.objects.filter(target__source=source_url)

        if not annotations.exists():
            return Response({"message": "No annotations found for the specified source."}, status=status.HTTP_404_NOT_FOUND)

        serializer = AnnotationSerializer(annotations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)