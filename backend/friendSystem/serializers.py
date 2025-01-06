from models import Friendship
from rest_framework import serializers


class   FriendshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friendship
        fields = ['from_user', 'to_user', 'status', 'action']
