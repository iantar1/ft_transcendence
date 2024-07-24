from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect


import requests

# Create your views here.

AuthUri = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-823fda6b1dac06b665ee52b73f2d6ae470b5e11f2a4b3780496c4c8deb9593ed&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code"

def home(request):
    response = redirect(AuthUri)
    return response
    pass

def auth(request):
    queryStr = request.META['QUERY_STRING']
    print(f"this : {queryStr}")
    print("---------------------")
    return HttpResponse("<h1>Ghadi nhakiwk alm3llem</h1>")

def getToken(request):
    payload = {'grant_type':'"authorization_code"', 'client_id':'u-s4t2ud-823fda6b1dac06b665ee52b73f2d6ae470b5e11f2a4b3780496c4c8deb9593ed',
               'client_secret':'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',
               'code':'e20e65a8302f43995eaff795fcf07bf79e5a4759a2a6b64c3a572ce418ae411e',
               'redirect_uri':'http://localhost:8000/',}
    r = requests.post('https://api.intra.42.fr/oauth/token', data=payload)
    print(f"here: {r.text}")
    return HttpResponse("<h1>Haaaa</h1>")




