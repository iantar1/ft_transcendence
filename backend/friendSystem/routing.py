from django.urls import re_path
from .consumers import Notifications


# define your routing list

websock_urlspatternd = [
    re_path('ws/notif', Notifications.as_asgi()),
]