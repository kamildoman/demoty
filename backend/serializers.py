from rest_framework import serializers
from .models import Demot, Comment

class DemotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demot
        fields = ('id', 'title', 'subtitle', 'image', 'upvote', 'downvote', 'ips')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'



    


    


    