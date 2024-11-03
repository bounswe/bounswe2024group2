from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from marketfeed.serializers import *
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny] 
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        user = request.user      
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=user)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request):
        instance = self.get_object()  # Retrieves the post instance based on the URL parameter (e.g., post ID)
        serializer = self.get_serializer(instance)
        
        # Customize the response to include detailed information for related fields
        data = serializer.data
        data['liked_by'] = [user.id for user in instance.liked_by.all()]
        data['tags'] = [{'id': tag.id, 'name': tag.name} for tag in instance.tags.all()]
        data['portfolios'] = [{'id': portfolio.id, 'name': portfolio.name} for portfolio in instance.portfolios.all()]

        return Response(data, status=status.HTTP_200_OK)
