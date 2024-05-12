from django.db import models
from app.models import CustomUser

    
class Post(models.Model):
    _id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    film = models.CharField(max_length=100)
    liked_by = models.ManyToManyField(CustomUser, related_name='liked_posts')
    @property
    def like_count(self):
        return self.liked_by.count()
    
    
class Like(models.Model):
    _id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
