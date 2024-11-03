
from marketfeed.models import *
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    # Many-to-Many relationships as custom fields
    liked_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    tags = serializers.SerializerMethodField()
    portfolios = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'liked_by', 'tags', 'portfolios']

    def get_tags(self, obj):
        return [{'id': tag.id, 'name': tag.name} for tag in obj.tags.all()]

    def get_portfolios(self, obj):
        return [{'id': portfolio.id, 'name': portfolio.name} for portfolio in obj.portfolios.all()]

    def create(self, validated_data):
        liked_by = validated_data.pop('liked_by', [])
        tags = self.initial_data.get('tags', [])
        portfolios = self.initial_data.get('portfolios', [])

        post = Post.objects.create(**validated_data)

        post.liked_by.set(liked_by)
        post.tags.set(tags)
        post.portfolios.set(portfolios)
        
        return post