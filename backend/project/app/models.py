from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    is_verified = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    # Add any other custom fields you need here
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
    
    
class BlacklistedToken(models.Model):
    token = models.CharField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token