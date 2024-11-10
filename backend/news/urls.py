from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

urlpatterns = [
    path('news/', NewsView.as_view(), name='news_feed'),
]