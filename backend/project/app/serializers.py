from django.contrib.auth.models import User
from app.models import Genre, Film, Director, Actor
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']
        
        
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']
    
    
class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['name', 'description', 'release_date', 'rating']
        
        
class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ['name', 'surname', 'description']
        
class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['name', 'surname', 'description']
        
