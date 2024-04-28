
from rest_framework import viewsets
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from app.models import Film, Genre, Director, Actor
from app.serializers import UserSerializer, FilmSerializer, GenreSerializer, DirectorSerializer, ActorSerializer, LogoutSerializer
from rest_framework.decorators import api_view, permission_classes
from drf_spectacular.utils import extend_schema
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,) #to allow unauthenticated users to get token
    serializer_class = MyTokenObtainPairSerializer


class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        

        return Response("success", status=200)
        
        
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
@extend_schema(
    description="API endpoint for retrieving and manipulating films.",
    methods=['GET', 'POST'],
    request=FilmSerializer,
)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated]) #to check if auth works maybe we dont need auth to get film details???
def film_api(request):
    """
    Retrieve or create films.
    """
    if request.method == 'GET':
        films = Film.objects.all()
        films_serializer = FilmSerializer(films, many=True)
        return JsonResponse(films_serializer.data, safe=False)
    elif request.method == 'POST':        
        films_serializer = FilmSerializer(data=request.data)
        if films_serializer.is_valid():
            films_serializer.save()
            return JsonResponse("Film Added Successfully", safe=False)
        else:
            print(films_serializer.errors)
            return JsonResponse("Failed to Add Film", safe=False)

@extend_schema(
    description="API endpoint for updating and deleting individual films.",
    methods=['GET', 'PUT', 'DELETE'],
    request=FilmSerializer

)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated]) #to check if auth works, maybe we dont need auth to get film details???
def film_detail_api(request, id):
    """
    Retrieve, update or delete a film instance.
    """
    try:
        film = Film.objects.get(id=id)
    except:
        return JsonResponse("Film not found", status=404)
    
    if request.method == 'GET':
        films_serializer = FilmSerializer(film)
        return JsonResponse(films_serializer.data, safe=False)
    
    elif request.method == 'PUT':
        films_serializer = FilmSerializer(film, data=request.data)
        if films_serializer.is_valid():
            films_serializer.save()
            return JsonResponse("Film Updated Successfully", safe=False)
        else:
            return JsonResponse("Failed to Update Film", safe=False)
    
    elif request.method == 'DELETE':
        film.delete()
        return JsonResponse("Film Deleted Successfully", safe=False)


