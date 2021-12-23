
from rest_framework import viewsets
from .serializers import DemotSerializer
from .models import Demot

class DemotView(viewsets.ModelViewSet):
    serializer_class = DemotSerializer
    queryset = Demot.objects.all()

