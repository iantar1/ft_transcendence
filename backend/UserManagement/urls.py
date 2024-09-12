from django.contrib import admin
from django.urls import path, include
from .views import *
from . import intra_auth
from . import views
from . import google_auth


urlpatterns = [
    path('register/', RegesterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('update/', UpdateView.as_view()),
    path('verify_otp/', VerifyOTPView.as_view()),
    path('intra/', intra_auth.home),
    # path('', intra_auth.auth),
    
    # path('set-two-factor-auth/', views.Set2FAView.as_view()),``
    # path('intra/')
    path('', google_auth.sign_in, name='sign_in'),
    path('sign-out', google_auth.sign_out, name='sign_out'),
    path('auth-receiver', google_auth.auth_receiver, name='auth_receiver'),
    

]

