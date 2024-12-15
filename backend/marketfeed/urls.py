from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'currencies', CurrencyViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'tags', TagViewSet)
router.register(r'portfolios', PortfolioViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'indices', IndexViewSet)
router.register(r'portfolio-stocks', PortfolioStockViewSet, basename='portfolio-stocks')
router.register(r'search', SearchViewSet, basename='search')

proxy_annotation_view = ProxyAnnotationView.as_view({
    'post': 'post', 
    'get': 'retrieve_annotations_by_posts',
})

urlpatterns = [
    path('', include(router.urls)),
    path('like', PostLikeView.as_view(), name='post-like'),
    path('dislike', PostDislikeView.as_view(), name='post-dislike'),
    path('annotations/', proxy_annotation_view, name='create-annotation'),
    path('annotations/post-annotations/<int:post_id>/', 
         ProxyAnnotationView.as_view({'get': 'retrieve_annotations_by_posts'}), 
         name='retrieve_annotations_by_postst'),
]
