from django.db import models
from django.contrib.auth.models import User


class Actor(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    description = models.TextField()
    # films = models.ManyToManyField(Film, verbose_name=_(""))

    
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
       
       
class Director(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    description = models.TextField()
    
    
class Film(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    cast = models.ManyToManyField(Actor)
    genre = models.ManyToManyField(Genre)
    director = models.ManyToManyField(Director)
    release_date = models.DateField()
    rating = models.FloatField()
    
