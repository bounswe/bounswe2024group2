from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.template import Template, Context
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http.response import JsonResponse
from onboarding.models import User as User
from onboarding.models import Profile
from rest_framework import permissions, status , viewsets, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import AllowAny, IsAuthenticated
import jwt
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from onboarding.serializers import *
from rest_framework import generics
from rest_framework import status
from onboarding.utils import Util
from rest_framework.decorators import action

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def post(self, request):
        user = request.data
        serializer = self.get_serializer(data=user)
        serializer.is_valid(raise_exception=True)
        
        user_data = serializer.validated_data
        serializer.save()
        user = User.objects.get(email=user_data['email'])
        
        token = RefreshToken.for_user(user).access_token
        
        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')
        
        absurl = 'http://' + current_site + relativeLink + "?token=" + str(token)
        email_template = Template("""
            <html>
            <body>
                <p><b>Hey,</b></p>
                <p>We need to verify your email address so you can use Bull&Bear.</p>
                <p><a href="{{ absurl }}">Click here to verify your email.</a></p>
                <p>Thanks,<br>Team Bull&Bear</p>
            </body>
            </html>
        """)
        context = Context({'absurl': absurl})
        html_message = email_template.render(context)
        data = {
            'html_message': html_message,
            'to_email': user.email,
            'email_subject': 'Hello! Verify your email for Bull&Bear!'
            ''
        }
        Util.send_email(data)
        
        return Response({
            'username': user.username,
            'email': user.email,
            'password': user_data['password']}, status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Email already verified'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,) #to allow unauthenticated users to get token
    serializer_class = MyTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def list(self, request):
        users = self.get_queryset()
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='by-username/(?P<username>[^/.]+)')
    def get_by_username(self, request, username=None):
        try:
            user = self.get_queryset().get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LogoutSerializer
    
    def post(self, request):
        requestData = request.data
        serializer = self.get_serializer(data=requestData)
        serializer.is_valid(raise_exception=True)
        
        refreshToken = requestData['refreshToken']
        
        header = request.META.get('HTTP_AUTHORIZATION') # to get access token
        accessToken = header.split()[1]
        
        
        if refreshToken:
            token = RefreshToken(refreshToken)
            token.blacklist()
            
            user = request.user  # to get user
        
            #  -> will be used if we want to define our blacklist tokens 
            # BlacklistedToken.objects.create(token=token, user=user)
            
            # will forward user to homepage when its defined
            # redirect("home")
            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        
        return Response({"error": "No Authorization Header"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    @action(detail=False, methods=['get'], url_path='by-user-id/(?P<user_id>[^/.]+)')
    def get_profile_by_user_id(self, request, user_id=None):
        try:
            profile = self.get_queryset().get(user__id=user_id)
        except Profile.DoesNotExist:
            # Create a user profile for that user
            user = User.objects.get(id=user_id)
            if not user:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            profile = Profile.objects.create(user=user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

User = get_user_model()

class FollowView(generics.GenericAPIView):
    serializer_class = FollowUnfollowSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']

        user_to_follow = get_object_or_404(User, username=username)
        profile_to_follow = user_to_follow.profile
        user_profile = request.user.profile

        if user_profile in profile_to_follow.followers.all():
            return Response({'detail': 'Already following this user.'}, status=status.HTTP_400_BAD_REQUEST)

        profile_to_follow.followers.add(user_profile)
        return Response({'detail': f'Successfully followed {username}.'}, status=status.HTTP_200_OK)


class UnfollowView(generics.GenericAPIView):
    serializer_class = FollowUnfollowSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']

        user_to_unfollow = get_object_or_404(User, username=username)
        profile_to_unfollow = user_to_unfollow.profile
        user_profile = request.user.profile

        if user_profile not in profile_to_unfollow.followers.all():
            return Response({'detail': 'You are not following this user.'}, status=status.HTTP_400_BAD_REQUEST)

        profile_to_unfollow.followers.remove(user_profile)
        return Response({'detail': f'Successfully unfollowed {username}.'}, status=status.HTTP_200_OK)