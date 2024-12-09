
from .models import *
from rest_framework import serializers
from onboarding.models import User


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


class PortfolioStockActionSerializer(serializers.Serializer):
    portfolio_id = serializers.PrimaryKeyRelatedField(queryset=Portfolio.objects.all())
    stock = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all())
    price_bought = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)

    def validate(self, data):
        """
        Ensure `price_bought` is provided for adding stocks.
        """
        if self.context['request'].method == 'POST' and self.context.get('view').action == 'add_stock':
            if 'price_bought' not in data:
                raise serializers.ValidationError({'price_bought': 'This field is required for adding a stock.'})
        return data

class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all())
    price_bought = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = PortfolioStock
        fields = ['stock', 'price_bought']

    def __init__(self, *args, **kwargs):
        super(PortfolioStockSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request and request.method == 'DELETE':
            self.fields['price_bought'].required = False


class PortfolioSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    stocks = PortfolioStockSerializer(source='portfolio_stocks', many=True, required=False)

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'description', 'user_id', 'created_at', 'updated_at', 'stocks']

    def create(self, validated_data):
        stocks_data = validated_data.pop('portfolio_stocks', [])
        portfolio = Portfolio.objects.create(**validated_data)
        for stock_data in stocks_data:
            PortfolioStock.objects.create(portfolio=portfolio, **stock_data)
        return portfolio

    def update(self, instance, validated_data):
        stocks_data = validated_data.pop('portfolio_stocks', [])
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        if stocks_data:
            # Update portfolio stocks
            instance.portfolio_stocks.all().delete()
            for stock_data in stocks_data:
                PortfolioStock.objects.create(portfolio=instance, **stock_data)
        return instance


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
    