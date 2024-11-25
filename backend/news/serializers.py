
from .models import *
from rest_framework import serializers

class NewsSerializer(serializers.Serializer):
    feed_name = serializers.CharField(max_length=100) 