
from rest_framework import serializers, viewsets, generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import DemotSerializer, CommentSerializer, RegisterSerializer, UserSerializer, LoginSerializer
from .models import Demot, Comment
from django.views.generic import View
import logging
from django.conf import settings
from django.http import HttpResponse
import os
from django.contrib.auth.models import User



class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        try:
            token = Token.objects.get(user_id=user.id)
        except Token.DoesNotExist:
            token = Token.objects.create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    


class DemotView(viewsets.ModelViewSet):
    serializer_class = DemotSerializer
    queryset = Demot.objects.all()


    def perform_create(self, serializer):
        token = self.request.POST.get("token")
        if token != 'null':
            user = Token.objects.get(key=token).user
            return serializer.save(owner=user)
        else:
            return serializer.save()

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        token = self.request.POST.get("token")
        if token != 'null':
            user = Token.objects.get(key=token).user
            return serializer.save(owner=user)
        else:
            return serializer.save()



class FrontendAppView(View):

    index_file_path = os.path.join(settings.BASE_DIR, 'build', 'index.html')

    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(

                status=501,
            )

