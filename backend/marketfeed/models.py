from django.db import models
from onboarding.models import *

# Models for market feed such as post, portfolio, stock, comment

class Tag(models.Model):
    name = models.CharField(max_length=40)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=250)
    created_at = models.DateField()
    updated_at = models.DateField(null=True)
    liked_by = models.ManyToManyField(User, verbose_name="list of users who liked the post")
    tags = models.ManyToManyField(Tag, verbose_name="list of tags added to the post")

class Comment(models.Model):
    post_id=models.ForeignKey(Post, on_delete=models.CASCADE)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=250)





