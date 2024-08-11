from django.urls import path
from .views import register_user, user_login, user_logout
# from rest_framework import views
from . import views
from .views import RegisterUserView
from . import intra_auth

urlpatterns = [
    # path('register/', register_user, name='register'),
    path('register/', RegisterUserView.as_view(), name='register'),
    # path('login/', user_login, name='login'),
    # path('logout/', user_logout, name='logout'),
    path('intra', intra_auth.home),
    path('logout', views.logout_view),
    path('', intra_auth.auth),
    
]
