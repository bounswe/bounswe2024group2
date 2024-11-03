from django.db import models
from onboarding.models import *

# Models for market feed such as post, portfolio, stock, comment

"""-----------------------------------------------------MANAGERS-----------------------------------------------------"""

class StockManager(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset()
        for stock in query_set:
            stock.price = stock.fetch_current_stock_price()
        return queryset


"""-------------------------------------------------------MODELS-------------------------------------------------------"""

class Currency(models.Model):
    name = models.CharField(max_length=40)
    code = models.CharField(max_length=5, unique=True)


class Stock(models.Model):
    name = models.CharField(max_length=250)
    symbol = models.CharField(max_length=250, unique=True)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)

    objects = StockManager()

    @property
    def price(self):
        return self.fetch_current_stock_price()

    def fetch_current_stock_price():
        #TODO: Stock fetching mechanism to be implemented
        return 10


class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Portfolio(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length = 150)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True, auto_now=True)
    stocks = models.ManyToManyField(Stock, verbose_name="list of stocks in the portfolio")


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    liked_by = models.ManyToManyField(User, related_name="liked_posts")
    tags = models.ManyToManyField(Tag, verbose_name="list of tags")
    portfolios = models.ManyToManyField(Portfolio, verbose_name="list of portfolios")


class Comment(models.Model):
    post_id=models.ForeignKey(Post, on_delete=models.CASCADE)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=250)
