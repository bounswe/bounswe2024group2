
from .models import *
from rest_framework import serializers
from onboarding.models import User
from datetime import datetime, timedelta

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id', 'name', 'code']


class StockSerializer(serializers.ModelSerializer):
    currency = serializers.PrimaryKeyRelatedField(queryset=Currency.objects.all())
    price = serializers.ReadOnlyField() 

    class Meta:
        model = Stock
        fields = ['id', 'name', 'symbol', 'currency', 'price']
    
    def __init__(self, *args, **kwargs):
        super(StockSerializer, self).__init__(*args, **kwargs)
        
        # Get the request method if available
        request = self.context.get('request', None)
        
        if request and request.method == 'POST':
            self.fields['currency'].required = True
            self.fields['price'].required = False
        elif request and request.method == 'PUT':
            self.fields['currency'].required = False
            self.fields['price'].required = False
            self.fields['name'].required = False
            self.fields['symbol'].required = False




class StockHistoricDataSerializer(serializers.Serializer):
    start_date = serializers.DateField()  # Start date of the interval
    end_date = serializers.DateField()  # End date of the interval

    def validate_date(self, value):
        two_years_ago = datetime.now() - timedelta(days=365*2)
        today = datetime.now().date()
        range = self.end_date - self.start_date
        if self.start_date < two_years_ago or self.end_date < two_years_ago:
            raise serializers.ValidationError("The given date/s cannot be older than 2 years.")
        elif self.start_date > today or self.end_date > today:
            raise serializers.ValidationError("The given date cannot be later than the current date.")
        elif range.days > 365:
            raise serializers.ValidationError("The date range must be less than or equal to one year.")

        return value




class TagSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Tag
        fields = ['id', 'name', 'user_id']

    def __init__(self, *args, **kwargs):
        super(TagSerializer, self).__init__(*args, **kwargs)
        
        # Get the request method if available
        request = self.context.get('request', None)
        
        if request and request.method == 'PUT':
            self.fields['name'].required = True
            self.fields['user_id'].required = False


class PortfolioSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    stocks = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all(), many=True)

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'description', 'user_id', 'created_at', 'updated_at', 'stocks']
    
    def __init__(self, *args, **kwargs):
        super(PortfolioSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request and request.method == 'PUT':
            self.fields['name'].required = False
            self.fields['description'].required = False
            self.fields['user_id'].required = False
            self.fields['stocks'].required = False

        elif request and request.method == 'POST':
            self.fields['name'].required = True
            self.fields['description'].required = False
            self.fields['user_id'].required = True
            self.fields['stocks'].required = False


class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    post_id = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ['id', 'post_id', 'user_id', 'content']
    
    def __init__(self, *args, **kwargs):
        super(CommentSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request and request.method == 'PUT':
            self.fields['post_id'].required = False
            self.fields['user_id'].required = False
        elif request and request.method == 'POST':
            self.fields['post_id'].required = True
            self.fields['user_id'].required = True


class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    liked_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True, required=False)
    portfolios = serializers.PrimaryKeyRelatedField(queryset=Portfolio.objects.all(), many=True, required=False)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'liked_by', 'tags', 'portfolios']

    def __init__(self, *args, **kwargs):
        super(PostSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request:
            if request.method == 'PUT' or request.method == 'DELETE':
                self.fields['title'].required = False
                self.fields['content'].required = False
                self.fields['liked_by'].required = False
                self.fields['tags'].required = False
                self.fields['portfolios'].required = False
                self.fields['author'].required = False

    def create(self, validated_data):
        liked_by = validated_data.pop('liked_by', [])
        tags = validated_data.pop('tags', [])
        portfolios = validated_data.pop('portfolios', [])

        post = Post.objects.create(**validated_data)

        post.liked_by.set(liked_by)
        post.tags.set(tags)
        post.portfolios.set(portfolios)

        return post
    