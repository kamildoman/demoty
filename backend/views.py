
from rest_framework import viewsets
from .serializers import DemotSerializer
from .models import Demot
from django.views.generic import View
import logging
from django.conf import settings
from django.http import HttpResponse
import os

class DemotView(viewsets.ModelViewSet):
    serializer_class = DemotSerializer
    queryset = Demot.objects.all()

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    build`).
    """
    index_file_path = os.path.join(settings.BASE_DIR, 'build', 'index.html')

    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `yarn start` on the frontend/ directory
                """,
                status=501,
            )

