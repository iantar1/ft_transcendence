from django.urls import path
from .views import register_user, user_login, user_logout, home_page
from . import views
from . import views
from .views import *
from . import intra_auth

urlpatterns = [
    path('register/', register_user, name='register'),
    # path('login/', user_login, name='login'),
    # path('home', home_page, name='home'),
    path('intra', intra_auth.home),
    path('logout', views.logout_view),
    path('', intra_auth.auth),
    path('test', views.test),
    path('login/', LoginView.as_view()),
    path('home', LoginView.as_view()),
    
    # path('get', )
    # path('register/', RegisterUserView.as_view(), name='register'),
    # path('logout/', user_logout, name='logout'),
    
]


#login
#register
#intra_auth
#google_auth
#logout
#autorized_resource