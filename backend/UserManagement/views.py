from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime
from .utils import *
from rest_framework import status

# Create your views here.


class RegesterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        access_token = create_access_token(user_data.get('id'))
        refresh_token = create_refresh_token(user_data.get('id'))

        response = Response()
        response.set_cookie(key="access", value=access_token, httponly=True)
        response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        response.data = {
            "access": access_token,
            "refresh": refresh_token
        }
        response.data.update(serializer.data)
        return response
        # return Response(serializer.data)
    

import random
from datetime import timedelta
from django.core.mail import send_mail
from django.utils import timezone

class LoginView(APIView):
    
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
    
        user = User.objects.filter(username=username).first()
        
        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("incorrect password")

         # Generate OTP
        otp = str(random.randint(100000, 999999))
        user.otp = otp
        user.otp_expiry_time = timezone.now() + timedelta(minutes=5)  # OTP expires in 5 minutes
        user.save()

        send_mail(
            'Your OTP Code',
            f'Your OTP code is: {otp}',
            'antartalha@gmail.com',  # Replace with your sender email
            [user.email],  # Send to the user's email
            fail_silently=False,
        )
        return Response({"message": "OTP sent to your email. Please enter the OTP to continue."})

        # access_token = create_access_token(user.id)
        # refresh_token = create_refresh_token(user.id)
        # response = Response()
        # response.set_cookie(key="access", value=access_token, httponly=True)#httponly=True means the backend will only get this cookie
        # response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        # response.data = {
        #     "access":access_token,
        #     "refresh":refresh_token
        # }
        # # httponly=True: becose we won't the frontend to access the token , only the backend
        # return response
            

class VerifyOTPView(APIView):

    def post(self, request):
        otp = request.data['otp']
        username = request.data['username']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed("user not found")
        if user.otp != otp or timezone.now() > user.otp_expiry_time:
            raise AuthenticationFailed("Invalid or expired OTP")

        # Generate tokens
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        response.set_cookie(key="access", value=access_token, httponly=True)
        response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        response.data = {
            "access": access_token,
            "refresh": refresh_token
        }

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
    
    def delete(self, request):
        token = request.COOKIES.get('access')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

    # should the user enter its password before deleting his account
        
        if user:
            user.delete()
            return Response({"detail": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        
        raise AuthenticationFailed('User not found')
    
    
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
        
        
        

#friedship management

# list friends
# send friend request (add frind)
# list friend requests
# accept friend request
# cancel a friend request
# block a user





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
