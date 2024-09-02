from django.contrib import admin
from django.urls import path, include
from .views import *
from . import intra_auth

urlpatterns = [
    path('register/', RegesterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('update/', UpdateView.as_view()),
    path('intra/', intra_auth.home),
    path('', intra_auth.auth),
    # path('intra/')
    

]

