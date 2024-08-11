
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'username', 'email', 'image','password', 'user_id']
        extra_kwargs = {'password': {'write_only': True}}#it will only be used for creating or updating data and will not be included in the serialized output

    def create(self, validated_data):
        user = CustomUser(
            last_name=validated_data['last_name'],
            first_name=validated_data['first_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            image=validated_data['image'],
            user_id=validated_data['user_id'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation['image'] = instance.image.name  # This gives you just the relative path
        return representation

