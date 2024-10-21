from django.shortcuts import render
from django.urls import path
from onboarding.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from backend.onboarding.views import MyObtainTokenPairView, RegisterView, LogoutView, VerifyEmail, \
    RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path('login/', MyObtainTokenPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='login/refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('request-reset-email', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    ]