from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime
# Create your views here.


class RegesterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    


class LoginView(APIView):
    
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
    
        user = User.objects.filter(username=username).first()
        
        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("incorrect password")
        
        #here 
        playlod = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),#it will despire after one minute
            'iat': datetime.datetime.utcnow(),#date which the token is created 
        }
        token = jwt.encode(playlod, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {
            "jwt":token
        }
        # httponly=True: becose we won't the frontend to access the token , only the backend
        return response
            


class UserView(APIView):
    
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            playload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
        serailiser = UserSerializer(user)
        return Response(serailiser.data)
    
    
class LogoutView(APIView):
    
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'the user is successfuly logout'
        }
        return response


class UpdateView(APIView):
    
    def post(self, request):
        token = request.COOKIES.get('jwt')
    
        if not token:
            raise AuthenticationFailed('Unauthenticated-')
        
        try:
            playload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated+')
        
    #check password and update it (password) (new password)
        
        user = User.objects.filter(id=playload['id']).first()
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        