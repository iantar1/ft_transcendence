from .models import Friendship, FriendsProfile
from UserManagement.serializers import UserSerializer
from rest_framework import serializers


class   FriendshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friendship
        fields = ['from_user', 'to_user', 'status', 'action']


class   FriendsProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    friends = UserSerializer(many=True)
    class Meta:
        model = FriendsProfile
        fields = ['user', 'friends']