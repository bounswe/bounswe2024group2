from django.shortcuts import render
from django.urls import path
from marketfeed.views import *


urlpatterns = [
    path('post/', PostViewSet.as_view({'post': 'create', }), name='create_post'), 
    path('post/<int:pk>/', PostViewSet.as_view({'get': 'retrieve'}), name='post-detail'),
]