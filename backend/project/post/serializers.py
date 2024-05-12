from post.models import Post, Like
from rest_framework import serializers

        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author', 'film']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user_id', 'post_id']