from django.db import models
from onboarding.models import *
import yfinance as yf
from datetime import timedelta
from django.utils.timezone import now

# Models for market feed such as post, portfolio, stock, comment

"""-----------------------------------------------------MANAGERS-----------------------------------------------------"""

class StockManager(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset


"""-------------------------------------------------------MODELS-------------------------------------------------------"""

class Currency(models.Model):
    name = models.CharField(max_length=40)
    code = models.CharField(max_length=5, unique=True)


class Stock(models.Model):
    name = models.CharField(max_length=250)
    symbol = models.CharField(max_length=250, unique=True)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    last_price = models.FloatField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True, null=True)
    objects = StockManager()
    @property
    def price(self):
        return self.fetch_current_stock_price()

    def fetch_current_stock_price(self):
        ticker = self.symbol
        currency = self.currency
        if self.last_updated:
            # if updated in less than 1 min, query last update price, don't request api
            if self.last_price and now() - self.last_updated < timedelta(minutes=1):
                return self.last_price
        
        if currency.code == 'TRY':
            ticker = ticker + '.IS'
            
        data = yf.download(tickers= ticker, period='1d', interval='1d')
        if not data.empty:
            price = data['Close'].iloc[-1][0]
            if isinstance(price, float):
                price = round(price,2)
        else:
            price = -1
            
        self.last_price = price
        self.save(update_fields=['last_price', 'last_updated'])
        return price


class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, **kwargs):
        self.name = self.name.lower()
        return super().save(**kwargs)


class Portfolio(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length = 150)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
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

class Index(models.Model):
    name = models.CharField(max_length=50, unique=True)
    symbol = models.CharField(max_length=250, unique=True, null=True)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE, null=True)
    stocks = models.ManyToManyField(Stock, verbose_name='list of stocks in the index')