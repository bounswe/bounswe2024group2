from django.shortcuts import render
from rest_framework import viewsets
from app.models import User
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_all_posts(self, request):
        posts = Post.objects.all()
        data = []
        for post in posts:
            film = {}
            film["title"]   = post.title
            film["content"] = post.content
            film["film"]    = post.film
            film["author_username"]  = User.objects.get(username=post.author).username
            data.append(film)
        return Response(data)
    
    def post(self, request):
        user = request.user
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=user)
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
    
    def search_post(self, request, search_query):
        posts_title_based = Post.objects.filter(title__contains=search_query)
        posts_content_based =  Post.objects.filter(content__contains=search_query)
        posts = posts_title_based.union(posts_content_based)
        data = []
        for post in posts:
            film = {}
            film["title"]   = post.title
            film["content"] = post.content
            film["film"]    = post.film
            film["author_username"]  = User.objects.get(username=post.author).username
            data.append(film)
        return Response(data)
    


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk=None):
        like = self.get_object(pk)
        serializer = self.serializer_class(like)
        return Response(serializer.data)
    
    def post(self, request):
        user = request.user
        post_id = request.data.get('post')
        # Check if the user has already liked the post
        like = Like.objects.filter(user=user, post=post_id).first()
        
        if like:
            # If the user has already liked the post, delete the like
            print("user has already liked the post")
            like.delete()
            return Response("Like deleted successfully", status=200)
        else:
            # If the user has not liked the post, create a new like
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
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
    
