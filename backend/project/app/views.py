
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.template import Template, Context
from django.conf import settings
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from app.models import Film, Genre, Director, Actor
from app.serializers import *
#from app.serializers import UserSerializer, FilmSerializer, GenreSerializer, DirectorSerializer, ActorSerializer,WikidataQuerySerializer, FilmPatternWithLimitQuerySerializer, MyTokenObtainPairSerializer, LogoutSerializer
from rest_framework import permissions, status , viewsets, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
import jwt
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from rest_framework import generics
from app.wikidata import WikidataAPI
from app.qlever import QleverAPI
from rest_framework.response import Response
from rest_framework import status
from .utils import Util


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
                <p>We need to verify your email address so you can use SemanticFlix.</p>
                <p><a href="{{ absurl }}">Click here to verify your email.</a></p>
                <p>Thanks,<br>Team SemanticFlix</p>
            </body>
            </html>
        """)
        context = Context({'absurl': absurl})
        html_message = email_template.render(context)
        data = {
            'html_message': html_message,
            'to_email': user.email,
            'email_subject': 'Hello! Verify your email for SemanticFlix!'
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
            if not user.is_active:
                user.is_active = True
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


# A simple endpoint for sending a semantic query to the Wikidata API
@extend_schema(
    description="API endpoint for sending a semantic query to the Wikidata API.",
    methods=['POST'],
    request=WikidataQuerySerializer,
)
@api_view(['POST'])
def execute_query(request):
    """
    Allow users to send a semantic query to the Wikidata API.
    """
    if request.method == 'POST':
        serializer = WikidataQuerySerializer(data=request.data)
        if serializer.is_valid():
            query_text = serializer.validated_data.get('query')

            # Execute the query using the WikidataAPI class
            wikidata_api = WikidataAPI()
            results = wikidata_api.execute_query(query_text)

            print(results)

            return Response(results)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Find films with a pattern string and a limit value
@extend_schema(
    description="API endpoint for finding films with a pattern string and a limit value.",
    methods=['POST'],
    request=FilmPatternWithLimitQuerySerializer,
)
@api_view(['POST'])
def query_film_pattern(request):
    """
    Find films with a pattern string and a limit value using Qlever.
    """
    if request.method == 'POST':
        serializer = FilmPatternWithLimitQuerySerializer(data=request.data)
        if serializer.is_valid():
            pattern = serializer.validated_data.get('pattern')
            limit = serializer.validated_data.get('limit')
            # Execute the query using the Qlever class
            qlever = QleverAPI()
            results = qlever.film_pattern_query(pattern, limit)

            print(results)

            # change response format
            # get only film ids and labels
            results = results['results']['bindings']
            films = []
            for result in results:
                film = {
                    'id': result['film']['value'],
                    'label': result['filmLabel']['value']
                }
                films.append(film)
            return Response(films)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Find films with a pattern string and a limit value
@extend_schema(
    description="API endpoint for recently released films.",
    methods=['POST'],
    request=LimitQuerySerializer,
)
@api_view(['POST'])
def recently_released_films(request):
    """
    Find films up to a limit value using Qlever.
    """
    if request.method == 'POST':
        serializer = LimitQuerySerializer(data=request.data)
        if serializer.is_valid():
            limit = serializer.validated_data.get('limit')

            # Execute the query using the Qlever class
            qlever = QleverAPI()
            results = qlever.recently_released_films(limit)

            print(results)
            # change response format
            # get only film ids and labels

            results = results['results']['bindings']
            films = []
            for result in results:
                film = {
                    'id': result['film']['value'],
                    'label': result['filmLabel']['value'],
                    'earliestPublicationDate': result['earliestPublicationDate']['value']
                }
                films.append(film)

            return Response(films)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Retrieve film details from Wikidata
@extend_schema(
    description="API endpoint for retrieving film details from Wikidata.",
    methods=['POST'],
    request=WikidataEntityIdSerializer,
)
@api_view(['POST'])
def get_film_details(request):
    """
    Retrieve film details from Wikidata.
    """
    if request.method == 'POST':
        serializer = WikidataEntityIdSerializer(data=request.data)
        if serializer.is_valid():
            entity_id = serializer.validated_data.get('entity_id')

            # Execute the query using the WikidataAPI class
            wikidata_api = WikidataAPI()
            results = wikidata_api.get_film_details(entity_id)

            print(results)

            return Response(results)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve label of a Wikidata entity
@extend_schema(
    description="API endpoint for retrieving the label of a Wikidata entity.",
    methods=['POST'],
    request=WikidataEntityIdSerializer,
)
@api_view(['POST'])
def get_label_of_entity(request):
    """
    Retrieve the label of a Wikidata entity.
    """
    if request.method == 'POST':
        serializer = WikidataEntityIdSerializer(data=request.data)
        if serializer.is_valid():
            entity_id = serializer.validated_data.get('entity_id')

            # Execute the query using the WikidataAPI class
            wikidata_api = WikidataAPI()
            results = wikidata_api.get_label_of_entity(entity_id)

            print(results)

            return Response(results)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

