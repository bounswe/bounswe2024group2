from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CurrencyViewSet, StockViewSet, TagViewSet, PortfolioViewSet, PostViewSet, CommentViewSet, IndexViewSet, PortfolioStockViewSet, PostLikeView, PostDislikeView

router = DefaultRouter()
router.register(r'currencies', CurrencyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'tags', TagViewSet)
router.register(r'portfolios', PortfolioViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'indices', IndexViewSet)
router.register(r'portfolio-stocks', PortfolioStockViewSet, basename='portfolio-stocks')

urlpatterns = [
    path('', include(router.urls)),
    path('like', PostLikeView.as_view(), name='post-like'),
    path('dislike', PostDislikeView.as_view(), name='post-dislike'),
]
