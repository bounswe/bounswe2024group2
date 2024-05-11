from django.shortcuts import render
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from post.views import *

    
urlpatterns = [
    path('create-post/', PostViewSet.as_view({'get': 'list', 'post': 'create'}), name='create_post'), 
]
