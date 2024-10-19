"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi
from rest_framework import permissions
from django.shortcuts import render

from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView



# This serves static files during development


# schema_view = get_schema_view(
#     openapi.Info(
#         title="Financial Markets Blog Project",
#         default_version='v1',
#         description="API documentation for Cmpe451 Project",
#     ),
#     public=True,
#     permission_classes=(permissions.AllowAny,),
# )


# def custom_swagger_view(request):
#     return render(request, 'swagger-ui.html', context={'schema_url': 'openapi-schema'})

# path('swagger/', custom_swagger_view, name='swagger-ui'),

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # path('docs/', custom_swagger_view, name='swagger-ui'),
    path(
        "docs/",
        SpectacularSwaggerView.as_view(
            template_name="swagger-ui.html", url_name="schema"
        ),
        name="swagger-ui",
    ),
    path("", include("onboarding.urls")),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

