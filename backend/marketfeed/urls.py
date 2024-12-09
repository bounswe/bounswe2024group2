from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CurrencyViewSet, StockViewSet, TagViewSet, PortfolioViewSet, PostViewSet, CommentViewSet, PostLikeDislikeViewSet

router = DefaultRouter()
router.register(r'currencies', CurrencyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'tags', TagViewSet)
router.register(r'portfolios', PortfolioViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'like-dislike', PostLikeDislikeViewSet, basename='like-dislike')

urlpatterns = [
    path('', include(router.urls)),
]