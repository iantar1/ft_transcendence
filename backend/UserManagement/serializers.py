from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'image', 'logged_in', 'otp_base32']
        extra_kwargs = {'password': {'write_only': True}}#it will only be used for creating or updating data and will not be included in the serialized output
        

    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     return user
    
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user
        # user = User(
        #     # id=validated_data['id'],
        #     first_name=validated_data['first_name'],
        #     last_name=validated_data['last_name'],
        #     username=validated_data['username'],
        #     # image = validated_data['image'],
        #     email=validated_data['email'],
        # )
        # user.set_password(validated_data['password'])
        # user.save()
        # return user
    
# {
#     "first_name": "a",
#     "last_name": "a",
#     "username": "a",
#     "email": "a@a.com",
#     "password": "a"
# }

# {
#     "username": "a",
#     "password": "a"
# }