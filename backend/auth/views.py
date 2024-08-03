from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import UserData
from django.http import JsonResponse
from django.core import serializers


import requests

# Create your views here.

AuthUri = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-823fda6b1dac06b665ee52b73f2d6ae470b5e11f2a4b3780496c4c8deb9593ed&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code"

def home(request):
    response = redirect(AuthUri) 
    return response
    pass

import requests
from .models import UserData

def storeUser(data_json):
    # check if the user already exsit
    user = UserData(
            user_id=data_json["id"],
            first_name = data_json["first_name"],
            last_name = data_json["last_name"],
            email = data_json["email"],
            image = data_json["image"]["link"],
            login = data_json["login"]
        )
    user.save()
    
    

def getData(access_token):
    url = "https://api.intra.42.fr/v2/me"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers)
    print(response.json())
    storeUser(response.json())
    
def auth(request):
    # queryStr = request.META['QUERY_STRING']
    response = redirect(AuthUri)
    queryStr = request.GET.get('code')
    print(f"this : {queryStr}")
    print("---------------------")
    payload = {'grant_type':'authorization_code', 
               'client_id':'u-s4t2ud-823fda6b1dac06b665ee52b73f2d6ae470b5e11f2a4b3780496c4c8deb9593ed',
               'client_secret':'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',
               'code':queryStr,
               'redirect_uri':'http://localhost:8000/',}
    r = requests.post('https://api.intra.42.fr/oauth/token', data=payload)
    print(payload)
    print(f"here: {r.json()}")
    try:
        access_token = r.json()['access_token']
        print(f"------------------------>>>>>> {access_token}")
        print(getData(access_token))
    except:
        return HttpResponse("<h1>GHyrha</h1>")
    return HttpResponse("<h1>Ghadi nhakiwk alm3llem</h1>")


# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# @app.route('/add_user', methods=['POST'])

def add_user(request):
    # data = request.json
    # print(data)
    return HttpResponse("<h1>The User was successfully added</h1>")
    return jsonify({"message": "User added successfully"}, 200)



def get_users(request):
    data = UserData.objects.all()
    serialized_data = serializers.serialize('json', data)
    return JsonResponse(serialized_data, safe=False)
    


def get_user_by_id(request, _login):
    # try:
    print(f"-----------..000000000----->>> {_login}")
    data = UserData.objects.all()
    print(f"-------------_>{data}")
    serialized_data = UserSerializer
    # except:
    #     return HttpResponse("<h1>this user id does't exist</h1>")
    return Response(serialized_data)
    return JsonResponse(serialized_data, safe=False)

def api(request):
    return HttpResponse("<h1>Nice</h1>")


# djangorest-freamework

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from rest_framework import generics
from rest_framework.decorators import api_view

# @api_view

class UserView(APIView):
    serializer_class =  UserSerializer
    def get(self, request):
        output = [{'user_id':output.user_id,
                  'first_name':output.first_name,
                  'last_name':output.last_name,
                  'login':output.login,
                  'email':output.email,
                  'image':output.image}
                  for output in UserData.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
class UserCreateView(generics.CreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        users = UserData.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)