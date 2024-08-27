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


def storeUser(data_json)-> int:
    # check if the user already exsit
    existing_user = CustomUser.objects.filter(email=data_json["email"]).first()

    if existing_user:
        print("User already exists.")
        return 1
    user = CustomUser(
            user_id=data_json["id"],
            first_name = data_json["first_name"],
            last_name = data_json["last_name"],
            email = data_json["email"],
            image = data_json["image"]["link"],
            username = data_json["login"]
        )
    user.save()
    return 0
    

def getData(access_token):
    url = "https://api.intra.42.fr/v2/me"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    print(f"the resposnse josn: {response.json()}")
    return storeUser(response.json())
    
def auth(request):
    # queryStr = request.META['QUERY_STRING']
    queryStr = request.GET.get('code')
    # print(f"this : {queryStr}")
    # print("---------------------")
    payload = {'grant_type':'authorization_code', 
               'client_id':CLIENT_ID,
               'client_secret':CLIENT_SECRET,
               'code':queryStr,
               'redirect_uri':REDIRECT_URI,}
    r = requests.post(OUUTH_TOKEN_URI, data=payload)
    # print(payload)
    print(f"here: {r.json()}")
    access_token = r.json()['access_token']
    print(f"------------------------>>>>>> {access_token}")
    if getData(access_token) == 1:
        print('this should not be printed')
        # return redirect("test")
        return HttpResponse("<h1>this user is Alrady xist</h1>")
    print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n")
    # try:
    #     access_token = r.json()['access_token']
    #     # print(f"------------------------>>>>>> {access_token}")
    #     getData(access_token)
    # except:
    return HttpResponse("<h1>Ghadi nhakiwk alm3llem</h1>")
