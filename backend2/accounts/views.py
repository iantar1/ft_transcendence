from django.shortcuts import render
from rest_framework import status
import rest_framework.request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
import django.http
import rest_framework
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# class User():
    
@api_view(['POST'])
@permission_classes([AllowAny])

def register_user(request):
    # if (request)
    print("je;llkjk==============")
    # exit()
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Response(serializer.data, status=status.HTTP_200_OK)
            # return redirect("home")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
from rest_framework.authtoken.models import Token
@api_view(['POST'])
@permission_classes([AllowAny])
# @permission_classes([AllowAny])
# @api_view(['GET'])


def user_login(request: rest_framework.request.Request):
    print("hheheheheheheheh")
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
    
        # user = None
        # if '@' in username:
        #     try:
        #         user = CustomUser.objects.get(email=username)
        #     except ObjectDoesNotExist:
        #         pass

        # if not user:
        user = authenticate(username=username, password=password)
        print(f"username : {username},  password:{password}, user: {user}")
        if user:
            # token = Token.generate_key()
            token = Token.objects.create(user=user)
            # print(f"the value of _ is :{_}")
            response = HttpResponse("cookie set")
            response.set_cookie('token', token)
            # response = Response({'token': token}, status=status.HTTP_200_OK)
            # response.set_cookie(key='auth_token', value=token, httponly=True, secure=True)
            return response

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['POST'])
# @permission_classes([IsAuthenticated])

def user_logout(request):
    if request.method == 'POST':
        try:
            # Delete the user's token to logout
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


        


from django.shortcuts import redirect
from django.contrib.auth import logout

# def home(request):
#     return render(request, "home.html")

def logout_view(request):
    logout(request)
    return redirect("/")



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
from django.http import HttpResponse
@api_view()
# used to wrap function-based views so that 
# they receive an instance of Request 
# (instead of the usual Django HttpRequest)
# and return a Response (instead of a Django HttpResponse).
# This decorator also allows you to specify which HTTP methods the view should respond to.
@permission_classes([AllowAny])
# @permission_classes([IsAuthenticated])
def home_page(request):
    # print(request.headers)
    token = request.COOKIES.get('auth_token')
    # print(token)
    if token:
        # Perform validation of the token (e.g., checking it against the database)
        # try:
            user = Token.user
            print(f"token: {token}")
            print(f"rToken.key: {Token.key}")
            if token == Token.key:  # Manually set the user on the request
                return HttpResponse("<h1>YOU'RE authorized alm3lem</h1>")
        # except:
            # pass

    return HttpResponse("<h1>You're Not</h1>")



# this form to be able to post 

from rest_framework.permissions import AllowAny
# @api_view(['POST'])
@permission_classes([AllowAny])

def test(request):
    print("hii")
    str = f"method: {request.method},  path:{request.path} , content_type:{request.content_type}"
    if request.method == 'POST':
        str = str + f" data : {request.data}"
        #
    return HttpResponse(str)

# @permission_classes([IsAuthenticated])

# def getUserData(request):
#     return     
    
    

# serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             # str = "hello"   


from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication

@permission_classes([AllowAny])
class LoginView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Your authentication logic here
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'Authorization: 'f"Token {token.key}"})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)

@permission_classes([AllowAny])

class HomeView(APIView):
    
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response("YES, ")
        
#this class   : TokenAuthentication