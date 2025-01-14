from django.urls import path
from .consumers import Notifications


# define your routing list

websock_urlspatternd = [
    path('wss/notif/', Notifications.as_asgi()),
]