
from rest_framework import viewsets
from .serializers import DemotSerializer, CommentSerializer
from .models import Demot, Comment
from django.views.generic import View
import logging
from django.conf import settings
from django.http import HttpResponse
import os

class DemotView(viewsets.ModelViewSet):
    serializer_class = DemotSerializer
    queryset = Demot.objects.all()

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

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

