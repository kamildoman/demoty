from rest_framework import serializers
from .models import Demot

class DemotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demot
        fields = ('id', 'title', 'subtitle', 'image', 'upvote', 'downvote', 'ips')



    


    


    