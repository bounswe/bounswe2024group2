from django.shortcuts import render
from django.urls import path
from app import views
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import film_api, film_detail_api

urlpatterns = [
    path('film/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('film/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('film/', film_api, name='film-list'),
    path('film/<int:id>/', film_detail_api, name='film-detail'),
]
