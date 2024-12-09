from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .serializers import *
from .models import *


class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        currencies = self.get_queryset()
        serializer = self.get_serializer(currencies, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        currency = self.get_object()
        serializer = self.get_serializer(currency)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        currency = self.get_object()
        serializer = self.get_serializer(currency, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        currency = self.get_object()
        currency.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        stocks = self.get_queryset()
        serializer = self.get_serializer(stocks, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        stock = self.get_object()
        serializer = self.get_serializer(stock)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        stock = self.get_object()
        serializer = self.get_serializer(stock, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        stock = self.get_object()
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        tags = self.get_queryset()
        serializer = self.get_serializer(tags, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        tag = self.get_object()
        serializer = self.get_serializer(tag)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        tag = self.get_object()
        serializer = self.get_serializer(tag, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        tag = self.get_object()
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        portfolios = self.get_queryset()
        serializer = self.get_serializer(portfolios, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        portfolio = self.get_object()
        serializer = self.get_serializer(portfolio)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        portfolio = self.get_object()
        serializer = self.get_serializer(portfolio, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        portfolio = self.get_object()
        portfolio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny] 
        return super().get_permissions()

    def list(self, request):
        posts = self.get_queryset()
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()  
        serializer = self.get_serializer(instance)
        
        data = serializer.data
        data['author'] = instance.author.id
        data['liked_by'] = [user.id for user in instance.liked_by.all()]
        data['disliked_by'] = [user.id for user in instance.disliked_by.all()]
        data['tags'] = [{'id': tag.id, 'name': tag.name} for tag in instance.tags.all()]
        data['portfolios'] = [{'id': portfolio.id, 'name': portfolio.name} for portfolio in instance.portfolios.all()]

        return Response(data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = self.get_serializer(post, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        comments = self.get_queryset()
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        comment = self.get_object()
        serializer = self.get_serializer(comment)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        comment = self.get_object()
        serializer = self.get_serializer(comment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        comment = self.get_object()
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostLikeDislikeViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = LikeDislikeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['post'], url_path='like')
    def like(self, request):
        """Handle liking a post."""
        serializer = LikeDislikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_id = serializer.validated_data['post_id']
        post = self.get_queryset().filter(id=post_id).first()  # Retrieve post
        if not post:
            return Response({"detail": f"Post with ID {post_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        if user in post.liked_by.all():
            post.liked_by.remove(user)
            return Response({"detail": "Like removed."}, status=status.HTTP_200_OK)

        post.liked_by.add(user)
        post.disliked_by.remove(user)  # Ensure mutual exclusivity
        return Response({"detail": "Post liked."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='dislike')
    def dislike(self, request):
        """Handle disliking a post."""
        serializer = LikeDislikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_id = serializer.validated_data['post_id']
        post = self.get_queryset().filter(id=post_id).first()  # Retrieve post
        if not post:
            return Response({"detail": f"Post with ID {post_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        if user in post.disliked_by.all():
            post.disliked_by.remove(user)
            return Response({"detail": "Dislike removed."}, status=status.HTTP_200_OK)

        post.disliked_by.add(user)
        post.liked_by.remove(user)  # Ensure mutual exclusivity
        return Response({"detail": "Post disliked."}, status=status.HTTP_200_OK)