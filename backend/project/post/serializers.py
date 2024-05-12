from post.models import Post, Like
from rest_framework import serializers

        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'film']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['post']