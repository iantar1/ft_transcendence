from django.urls import path, include
from auth import views

urlpatterns = [
    path('', views.auth),
    path('home', views.home),
    path('token', views.getToken),
]
