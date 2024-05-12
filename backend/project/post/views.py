from django.shortcuts import render
from rest_framework import viewsets
from app.models import CustomUser
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk=None):
        post = self.get_object(pk)
        serializer = self.serializer_class(post)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("success", status=200)

    def put(self, request, pk=None):
        post = self.get_object(pk)
        serializer = self.serializer_class(post, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk=None):
        post = self.get_object(pk)
        post.delete()
        return Response("Post deleted successfully", status=200)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk=None):
        like = self.get_object(pk)
        serializer = self.serializer_class(like)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("success", status=200)

    def put(self, request, pk=None):
        like = self.get_object(pk)
        serializer = self.serializer_class(like, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk=None):
        like = self.get_object(pk)
        like.delete()
        return Response("Like deleted successfully", status=200)
    
    
class LikeCountViewSet(viewsets.ViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_like_count(self, request, pk=None):
        print(pk)
        like_count = self.queryset.filter(post_id=pk).count()
        return Response({'like_count': like_count})
