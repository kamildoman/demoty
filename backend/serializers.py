from rest_framework import serializers
from .models import Demot, Comment
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class DemotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demot
        fields = ('id', 'owner', 'title', 'subtitle', 'image', 'upvote', 'downvote', 'ips')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(validated_data
        ['username'], validated_data['email'], validated_data['password'])

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorect data")




    


    


    