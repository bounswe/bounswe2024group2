from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class Badge(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)


class User(AbstractUser):
    is_verified = models.BooleanField(default=False)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    

class BlacklistedToken(models.Model):
    token = models.CharField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token
