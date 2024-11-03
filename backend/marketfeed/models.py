from django.db import models
from onboarding.models import *

# Models for market feed such as post, portfolio, stock, comment

class Currency(models.Model):
    name = models.CharField(max_length=40)
    code = models.CharField(max_length=5)


class Stock(models.Model):
    name = models.CharField(max_length=250)
    symbol = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=19, decimal_places=10)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)


class Tag(models.Model):
    name = models.CharField(max_length=40)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()


class Portfolio(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length = 150)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True, auto_now=True)
    stocks = models.ManyToManyField(Stock, verbose_name="list of stocks in the portfolio")


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=250)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(null=True, auto_now=True)
    liked_by = models.ManyToManyField(User, verbose_name="list of users who liked the post")
    tags = models.ManyToManyField(Tag, verbose_name="list of tags added to the post")
    portfolios = models.ManyToManyField(Portfolio, verbose_name="list of portfolios added to the post")


class Comment(models.Model):
    post_id=models.ForeignKey(Post, on_delete=models.CASCADE)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    content = models.CharField(max_length=250)
