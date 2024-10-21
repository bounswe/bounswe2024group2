from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.template import Template, Context
from django.conf import settings
from django.http.response import JsonResponse
from onboarding.models import User as User
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

class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    
    def post(self, request):
        data = {'request': request, 'data': request.data}
        serializer = self.serializer_class(data=data)
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            
            current_site = get_current_site(request=request).domain
            relativeLink = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            
            absurl = 'http://' + current_site + relativeLink + "?token=" + str(token)
            email_template = Template("""
                <html>
                <body>
                    <p><b>Hey,</b></p>
                    <p>WYou can use the following link to reset your password/.</p>
                    <p><a href="{{ absurl }}">Click here to reset your password.</a></p>
                    <p>Thanks,<br>Team Bull&Bear</p>
                </body>
                </html>
            """)
            context = Context({'absurl': absurl})
            html_message = email_template.render(context)
            data = {
                'html_message': html_message,
                'to_email': user.email,
                'email_subject': 'Hello! Reset Your Password for Bull&Bear!'
                ''
            }
            
            Util.send_email(data)
        
        return Response({'success': "Whe have sent you a link to reset your password", "token": token, 'uidb64': uidb64}, status=200)

class PasswordTokenCheckAPI(generics.GenericAPIView):
        def get(self, request, uidb64, token):
           try:
               id = force_str(urlsafe_base64_decode(uidb64))
               user = User.objects.get(id=id)
               
            #    if not user.is_active:
            #        raise AuthenticationFailed('User is not active')
               
               return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64,'token': token}, status=200)
               
               if not PasswordResetTokenGenerator().check_token(token, user):
                   raise Response({'message': 'The reset link is invalid, please request a new one.'}, status=401)
               
               return Response({'message': 'Credentials are correct'}, status=200)
           except DjangoUnicodeDecodeError as e:
               if not PasswordResetTokenGenerator().check_token(token, user):
                   raise Response({'message': 'The reset link is invalid, please request a new one.'}, status=401)
        

class  SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=200)
        

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,) #to allow unauthenticated users to get token
    serializer_class = MyTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
