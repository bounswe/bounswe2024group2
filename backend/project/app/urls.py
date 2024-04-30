from django.shortcuts import render
from django.urls import path
from app import views
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from app.views import *
from rest_framework_simplejwt.views import TokenRefreshView

    
urlpatterns = [
    # path('film/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('film/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('film/', film_api, name='film-list'),
    path('film/<int:id>/', film_detail_api, name='film-detail'),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    path('request-reset-email', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('recently-release-films/', recently_released_films, name='recently-release-films'),
    path('get-film-details/', get_film_details, name='get-film-details'),
    path('get-label-of-entity/', get_label_of_entity, name='get-label-of-entity'),
]
