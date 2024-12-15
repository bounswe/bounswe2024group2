
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

class StockCreateSerializer(serializers.ModelSerializer):
    currency = serializers.PrimaryKeyRelatedField(queryset=Currency.objects.all())

    class Meta:
        model = Stock
        fields = ['id', 'name', 'symbol', 'currency']
    
    def __init__(self, *args, **kwargs):
        super(StockCreateSerializer, self).__init__(*args, **kwargs)
        
        # Get the request method if available
        request = self.context.get('request', None)
        
        if request and request.method == 'POST':
            self.fields['currency'].required = True

class StockGetSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = Stock
        fields = ['id', 'name', 'symbol', 'currency']
        
    
    def __init__(self, *args, **kwargs):
        super(StockGetSerializer, self).__init__(*args, **kwargs)
        
        # Get the request method if available
        request = self.context.get('request', None)
        


class StockHistoricDataSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=False, default=None)  # Start date of the interval
    end_date = serializers.DateField(required=False, default=None)  # End date of the interval
    period = serializers.CharField(
        required=False,
        max_length=3,  # Adjust based on the maximum length of your options
        help_text="'1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'."
    )
    interval = serializers.CharField(
        max_length=3,  # Adjust based on the maximum length of your options
        help_text="'1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1wk', '1mo', '3mo"
    )
    

    def validate_date(self, value):
        return value

class StockPatternSearchSerializer(serializers.Serializer):
    pattern = serializers.CharField(
        required=True,
        help_text="The pattern to search stock symbol and name for.",
    )
    limit = serializers.IntegerField(required=False, default=10)

class TagSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)

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
    quantity = serializers.IntegerField(min_value=1, required=False) 

    def validate(self, data):
        if self.context['request'].method == 'POST' and self.context.get('view').action == 'add_stock':
            if 'price_bought' not in data:
                raise serializers.ValidationError({'price_bought': 'This field is required for adding a stock.'})
        return data

class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all())
    price_bought = serializers.DecimalField(max_digits=10, decimal_places=2)
    quantity = serializers.IntegerField(min_value=1) 

    class Meta:
        model = PortfolioStock
        fields = ['stock', 'price_bought', 'quantity']

    def __init__(self, *args, **kwargs):
        super(PortfolioStockSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request and request.method == 'DELETE':
            self.fields['price_bought'].required = False
            self.fields['quantity'].required = False


class PortfolioSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
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
        if 'portfolio_stocks' in validated_data:
            stocks_data = validated_data.pop('portfolio_stocks')
            instance.portfolio_stocks.all().delete()
            for stock_data in stocks_data:
                PortfolioStock.objects.create(portfolio=instance, **stock_data)
        
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
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
    stocks = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all(), many=True, required=False)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'liked_by', 'disliked_by', 'tags', 'portfolios', 'stocks']

    def __init__(self, *args, **kwargs):
        super(PostSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request:
            if request.method == 'PUT' or request.method == 'DELETE':
                self.fields['title'].required = False
                self.fields['content'].required = False
                self.fields['liked_by'].required = False
                self.fields['disliked_by'].required = False
                self.fields['tags'].required = False
                self.fields['portfolios'].required = False
                self.fields['author'].required = False

    def create(self, validated_data):
        liked_by = validated_data.pop('liked_by', [])
        disliked_by = validated_data.pop('disliked_by', [])
        tags = validated_data.pop('tags', [])
        portfolios = validated_data.pop('portfolios', [])

        post = Post.objects.create(**validated_data)

        post.liked_by.set(liked_by)
        post.disliked_by.set(disliked_by)
        post.tags.set(tags)
        post.portfolios.set(portfolios)

        return post

class LikeSerializer(serializers.ModelSerializer):

    post_id = serializers.IntegerField(write_only=True)  # Accept post ID in the request

    class Meta:
        model = Post
        fields = ['post_id']

class DislikeSerializer(serializers.ModelSerializer):

    post_id = serializers.IntegerField(write_only=True)  # Accept post ID in the request

    class Meta:
        model = Post
        fields = ['post_id']
    
 # TODO delete this


class StockListSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = Stock
        fields = ['symbol','currency']

    def __init__(self, *args, **kwargs):
        super(StockListSerializer, self).__init__(*args, **kwargs)
         
    
class IndexListSerializer(serializers.ModelSerializer):
    #stocks = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all(), many=True)
    #stocks = StockSerializer(many=True)
    # TODO should populate stocks but by fetching all of their prices at once.
    stocks = StockListSerializer(many=True)
    currency = CurrencySerializer()
    class Meta:
        model = Index
        fields = ['id', 'name','symbol','currency', 'stocks']
    
    def __init__(self, *args, **kwargs):
        super(IndexListSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)

        if request and request.method == 'PUT':
            self.fields['name'].required = False
            self.fields['stocks'].required = False

        elif request and request.method == 'POST':
            self.fields['name'].required = True
            self.fields['stocks'].required = False

class IndexSerializer(serializers.ModelSerializer):
    stocks = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all(), many=True)
    #stocks = StockSerializer(many=True)
    # TODO should populate stocks but by fetching all of their prices at once.
    #stocks = StockListSerializer(many=True)
    currency = serializers.PrimaryKeyRelatedField(queryset=Currency.objects.all())
    class Meta:
        model = Index
        fields = ['id', 'name','symbol','currency', 'stocks']
    
    def __init__(self, *args, **kwargs):
        super(IndexSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)

        if request and request.method == 'PUT':
            self.fields['name'].required = False
            self.fields['stocks'].required = False

        elif request and request.method == 'POST':
            self.fields['name'].required = True
            self.fields['stocks'].required = False



class MinimalAnnotationSerializer(serializers.Serializer):
    post_id = serializers.IntegerField()
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
    start = serializers.IntegerField()
    end = serializers.IntegerField()
    value = serializers.CharField()

    def validate_post_id(self, post_id):
        if not Post.objects.filter(id=post_id).exists():
            raise serializers.ValidationError(f"Post with id {post_id} does not exist.")
        return post_id


    def validate(self, data):
        if data['start'] >= data['end']:
            raise serializers.ValidationError("The 'start' position must be less than the 'end' position.")
        return data
         
class PostStockAddSerializer(serializers.Serializer):
    post_id = serializers.IntegerField(help_text="ID of the post to which stocks will be added.")
    stock_ids = serializers.ListField(
        child=serializers.IntegerField(),
        help_text="List of stock IDs to be added to the post."
    )

    def validate(self, data):
        post_id = data.get('post_id')
        stock_ids = data.get('stock_ids', [])

        # Validate Post
        try:
            data['post'] = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise serializers.ValidationError({"post_id": "Post with this ID does not exist."})

        # Validate Stocks
        valid_stocks = Stock.objects.filter(id__in=stock_ids)
        if len(stock_ids) != valid_stocks.count():
            invalid_ids = set(stock_ids) - set(valid_stocks.values_list('id', flat=True))
            raise serializers.ValidationError({"invalid_stock_ids": list(invalid_ids)})

        return data

    def save(self):
        post = self.validated_data['post']
        stock_ids = self.validated_data['stock_ids']
        stocks = Stock.objects.filter(id__in=stock_ids)
        post.stocks.add(*stocks)
        return post

