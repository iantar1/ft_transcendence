import requests
from .models import *
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import *
from django.http import JsonResponse, HttpResponseRedirect
from django.core import serializers
from config.settings import env
import os
from dotenv import load_dotenv
from .serializers import UserSerializer
from rest_framework.response import Response
from django.core.files.temp import NamedTemporaryFile
from django.core.files import File
from .utils import *
from rest_framework.exceptions import AuthenticationFailed

AUTH_PROVIDER_URI = "https://www.googleapis.com/oauth2/v1/certs"
PROJECT_ID = "transcendence-432116"
# AUTH_URI = "https://accounts.google.com/o/oauth2/auth"
CLIENT_ID = "242624585573-1e6f1paf05v1ngnpfdd6vblr1t1clru8.apps.googleusercontent.com"
CLIENT_SECRET = "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"
OUUTH_TOKEN_URI = "https://oauth2.googleapis.com/token"

redirect_uri = "https://yourdomain.com/googleAuth/callback"  # This should match the URI on Google Cloud

google_auth_url = "https://accounts.google.com/o/oauth2/auth"
REDIRECT_URI = "http://127.0.0.1:8000/accounts/google/login/callback/"

AUTH_URI = f"{google_auth_url}?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=profile%20email&response_type=code&access_type=offline"

# AuthUri = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-823fda6b1dac06b665ee52b73f2d6ae470b5e11f2a4b3780496c4c8deb9593ed&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code"

def home(request):
    return redirect(AUTH_URI)


from django.shortcuts import redirect
from django.http import JsonResponse



def google_callback(request):
    # Retrieve the authorization code from the callback URL
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'error': 'Authorization code not provided'}, status=400)

    # Exchange the authorization code for an access token
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    response = requests.post(token_url, data=data)
    token_response_data = response.json()

    # Retrieve access token from the response
    access_token = token_response_data.get("access_token")
    if not access_token:
        return JsonResponse({'error': 'Failed to retrieve access token'}, status=400)

    # Use access token to get user info from Google
    user_info_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    user_info_response = requests.get(user_info_url, headers={"Authorization": f"Bearer {access_token}"})
    user_data = user_info_response.json()

    # Output user data (in production, you’d probably save this to your database or create a user session)
    return JsonResponse(user_data)

def get_code(request):
    code = request.GET.get('code')
    plyload = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    response = requests.post(OUUTH_TOKEN_URI, data=plyload)

    access_token = response.json().get('access_token')
    userInfoJson = getUserInfo(access_token)

    user = storeUser(userInfoJson.json())

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    response = HttpResponseRedirect('https://localhost:3000/home')  # Redirect to frontend
    response.set_cookie(key="access", value=access_token, httponly=False)
    response.set_cookie(key="refresh", value=refresh_token, httponly=True)
    return response


def getUserInfo(access_token):
    url = "https://www.googleapis.com/oauth2/v1/userinfo"
    userInfor = requests.get(url, headers={"Authorization": f"Bearer {access_token}"})
    print(f"the resposnse josn: {userInfor.json()}")
    return userInfor


def storeUser(data)-> User:
    # check if the user already exsit
    existing_user = User.objects.filter(email=data.get("email")).first()
    existing_user = User.objects.filter(username=data.get("given_name") + data.get("family_name")).first()

    if existing_user:
        print("User already exists.")
        return existing_user
    response = requests.get(data.get("picture"))
    if response.status_code == 200:
        img_temp = NamedTemporaryFile(delete=True, suffix='.png')
        img_temp.write(response.content)
        img_temp.flush()

        # Extract the image filename from the URL
        filename = os.path.basename(data.get("picture")) + ".png"

    user = User(
            # id=data["id"],
            first_name = data.get("given_name"),
            last_name = data.get("family_name"),
            email = data.get("email"),
            image = File(img_temp, name=filename),#set default if you can't get the image
            username = data.get("given_name") + data.get("family_name")
        )
    user.save()
    return user
    
def generateUserName(first_name, last_name):
    return f"{first_name}_{last_name}"

def getData(access_token) -> User:
    url = "https://accounts.google.com/gsi/client"#add this to env var
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    print(f"the resposnse josn: {response.json()}")
    return storeUser(response.json())

from rest_framework.renderers import JSONRenderer

def auth(request):
    
    queryStr = request.GET.get('code')

    payload = {'grant_type':'authorization_code', 
               'client_id':CLIENT_ID,
               'client_secret':CLIENT_SECRET,
               'code':queryStr,
               'redirect_uri':REDIRECT_URI,}
    r = requests.post(OUUTH_TOKEN_URI, data=payload)
    print(f"here: {r.json()}")
    # try:
        # intra_access_token =  r.cookies.get('access_token')
    intra_access_token = r.json().get('access_token')#['access_token']
    user = getData(intra_access_token)
    # except:
    #     raise AuthenticationFailed('Unauthenticated')
    print(f"------------------------>>>>>> {intra_access_token}")
        
    serializer = UserSerializer(user)
    # user.use
    response = Response(serializer.data)
    response.accepted_renderer = JSONRenderer()
    response.accepted_media_type = 'application/json'
    response.renderer_context = {
    'request': request,
    'response': response
    }
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    response.set_cookie(key="access", value=access_token)
    response.set_cookie(key="refresh", value=refresh_token, httponly=True)
    return response
    return Response(serializer.data)

# read the subject again
# recreate a new intra auth
# use jwt and set the cookie and redirct to home
# if unthenticated user try to acess the /home rediract him to /register
# authentcate with google 
