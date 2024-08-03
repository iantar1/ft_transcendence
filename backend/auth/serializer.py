from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['user_id', 'first_name', 'last_name', 'login', 'email', 'image']

    def create(self, validated_data):
        return UserData.objects.create(**validated_data)