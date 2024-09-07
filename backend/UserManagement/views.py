from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime
from .utils import *
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
        # playlod = {
        #     'id': user.id,
        #     'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),#it will despire after one minute
        #     'iat': datetime.datetime.utcnow(),#date which the token is created 
        # }
        # token = jwt.encode(playlod, 'access_secret', algorithm='HS256')
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key="access", value=access_token, httponly=True)#httponly=True means the backend will only get this cookie
        response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        response.data = {
            "access":access_token,
            "refresh":refresh_token
        }
        # httponly=True: becose we won't the frontend to access the token , only the backend
        return response
            


class UserView(APIView):
    
    def get(self, request):
        token = request.COOKIES.get('access')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
        serailiser = UserSerializer(user)
        return Response(serailiser.data)
    
    
class LogoutView(APIView):
    
    def post(self, request):
        response = Response()
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {
            'message':'the user is successfuly logout'
        }
        return response


class UpdateView(APIView):
    
    def post(self, request):
        token = request.COOKIES.get('access')
    
        if not token:
            raise AuthenticationFailed('Unauthenticated-')
        
        try:
            playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated+')
        
    #check password and update it (password) (new password)
        
        user = User.objects.filter(id=playload['id']).first()
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
        
        

# class Set2FAView(APIView):
#     """
#     Get the image of the QR Code
#     """
#     def post(self, request):
#     user = getUserService(request)
#     if user == None:
#     return Response({"status": "fail", "message": f"No user with the corresponding username and password exists" }, 
#     status=status.HTTP_404_NOT_FOUND)

#     qr_code = getQRCodeService(user)
#     return Response({"qr_code": qr_code})