from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    _id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    film = models.CharField(max_length=100)

