from django.shortcuts import render
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from post.views import *

    
urlpatterns = [
    path('post/', PostViewSet.as_view({'get': 'get_all_posts', 'post': 'post', }), name='create_post'), 
    path('post/<int:pk>/', PostViewSet.as_view({'get': 'retrieve', 'put': 'put', 'delete': 'destroy'}), name='post-detail'),
    path('post/search/<str:search_query>/', PostViewSet.as_view({'get': 'search_post'}), name='search-post'),
    path('like/', LikeViewSet.as_view({'get': 'list', 'post': 'post', }), name='create_like'),
    path('like/<int:pk>/', LikeViewSet.as_view({'get': 'retrieve', 'put': 'put', 'delete': 'delete'}), name='like-detail'),
    path('like/like-count/<int:pk>/', LikeCountViewSet.as_view({'get': 'get_like_count'}), name='like-count'),
]
