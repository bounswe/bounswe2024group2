from django.contrib.auth import get_user_model
from onboarding.models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        if not user.is_verified:
            raise serializers.ValidationError("User is not verified. Please verify your account before logging in.")
            
        return data


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email']
        
        
class LogoutSerializer(serializers.Serializer):
    refreshToken = serializers.CharField(required=True, max_length=512)

    def validate_refresh_token(self, value):
        if not value:
            raise serializers.ValidationError("Refresh token is required.")
        return value


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    followers = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(), many=True, required=False)
    following = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all(), many=True, required=False)

    class Meta:
        model = Profile
        fields = ['user', 'profile_picture', 'followers', 'following', 'bio', 'location']

    def __init__(self, *args, **kwargs):
        super(ProfileSerializer, self).__init__(*args, **kwargs)
        
        request = self.context.get('request', None)
        
        if request and request.method == 'POST':
            self.fields['user'].required = True
            self.fields['profile_picture'].required = False
            self.fields['followers'].required = False
            self.fields['following'].required = False
            self.fields['bio'].required = False
            self.fields['location'].required = False
        elif request and request.method == 'PUT':
            self.fields['user'].required = False
            self.fields['profile_picture'].required = False
            self.fields['followers'].required = False
            self.fields['following'].required = False
            self.fields['bio'].required = False
            self.fields['location'].required = False

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        followers = validated_data.pop('followers', None)
        following = validated_data.pop('following', None)
        
        if followers is not None:
            instance.followers.set(followers)
        if following is not None:
            instance.following.set(following)

        return super().update(instance, validated_data)

User = get_user_model()
class FollowUnfollowSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate_username(self, value):
        # Ensure the username exists in the database
        try:
            user = User.objects.get(username=value)
        except User.DoesNotExist:
            raise serializers.ValidationError(f"User with username '{value}' does not exist.")
        return value