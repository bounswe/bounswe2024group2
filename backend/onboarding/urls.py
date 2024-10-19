from django.shortcuts import render
from django.urls import path
from onboarding.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path('login/', MyObtainTokenPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='login/refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    ]