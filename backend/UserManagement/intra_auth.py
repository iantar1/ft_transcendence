import requests
from .models import *
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import *
from django.http import JsonResponse
from django.core import serializers
import requests
from config.settings import env
import os
from dotenv import load_dotenv
from .serializers import UserSerializer
from rest_framework.response import Response
from django.core.files.temp import NamedTemporaryFile
from django.core.files import File
from .utils import *
from rest_framework.exceptions import AuthenticationFailed

# AUTH_URI = os.environ.get('AUTH_URI')

load_dotenv()
AUTH_URI = os.getenv('AUTH_URI')
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')
OUUTH_TOKEN_URI = os.getenv('OUUTH_TOKEN_URI')



# AuthUri = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-823fda6b1dac06b665ee52b73f2d6ae470b5e11f2a4b3780496c4c8deb9593ed&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code"

def home(request):
    return redirect(AUTH_URI)


def storeUser(data_json)-> User:
    # check if the user already exsit
    # existing_user = User.objects.filter(username=data_json.get("login")).first()

    # if existing_user:
    #     return existing_user
    print(f'**************************8')
    print(f'---------------++++++++++++++------')
    response = requests.get(data_json.get("image", {}).get("link"))
    if response.status_code == 200:
        print(f"Image fetched successfully, content length: {len(response.content)}")
        img_temp = NamedTemporaryFile()#IF the temporary file will be deleted once it's closed
        img_temp.write(response.content)
        img_temp.flush()
        print(f'****************************')
        print(f'here---------------------here')
        print(f'****************************')


        # Extract the image filename from the URL
    filename = os.path.basename(data_json.get("image", {}).get("link"))
    print(f'filename: {filename}')
    user = User(
            # id=data_json["id"],
            first_name = data_json.get("first_name"),
            last_name = data_json.get("last_name"),
            email = data_json.get("email"),
            image = File(img_temp, name=filename),#set default if you can't get the image
            username = data_json.get("login")
        )
    user.save()
    return user
    

def getData(access_token) -> User:
    url = "https://api.intra.42.fr/v2/me"#add this to env var
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    print(f"the resposnse josn: {response.json()}")
    return storeUser(response.json())

from rest_framework.renderers import JSONRenderer

from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse

def auth(request):

    queryStr = request.GET.get('code')

    payload = {'grant_type':'authorization_code', 
               'client_id':CLIENT_ID,
               'client_secret':CLIENT_SECRET,
               'code':queryStr,
               'redirect_uri':REDIRECT_URI,}
    r = requests.post(OUUTH_TOKEN_URI, data=payload)
    print(f"here: {r.json()}")
    print("000000000000000000000000000000000000000000000000000000000000000000000000")
    # try:
        # intra_access_token =  r.cookies.get('access_token')
    intra_access_token = r.json().get('access_token')#['access_token']
    user = getData(intra_access_token)
    # except:
    #     raise AuthenticationFailed('Unauthenticated')
    print(f"------------------------>>>>>> {intra_access_token}")
        
    serializer = UserSerializer(user)
    # user.use
    # response = Response(serializer.data)
    # response.accepted_renderer = JSONRenderer()
    # response.accepted_media_type = 'application/json'
    # response.renderer_context = {
    # 'request': request,
    # 'response': response
    # }
    access_token = create_access_token(user.id)

    response = HttpResponseRedirect('http://localhost:3000/home')  # Redirect to frontend
    response.set_cookie(key="access", value=access_token, httponly=True)

    # Pass access token and any other required data in the URL or headers
    # Option 1: Passing token as URL parameters (not recommended for security)
    # response['Location'] = f'http://localhost:3000/home?access_token={access_token}'
    
    # Option 2: Passing token via headers (more secure)
    response['Authorization'] = f'Bearer {access_token}'
    
    # You can also add additional user data if needed
    # response['X-User-Data'] = serializer.data

    return response
    return Response(serializer.data)
    # return redirect("http://localhost:3000/login")

# read the subject again
# recreate a new intra auth
# use jwt and set the cookie and redirct to home
# if unthenticated user try to acess the /home rediract him to /register
# authentcate with google 
