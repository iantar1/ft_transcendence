from django.urls import path, include
from auth import views
from auth.views import *

urlpatterns = [
    path('', views.auth),
    path('api', views.api),
    path('home', views.home),
    path('add_user', views.add_user),
    path('get_users', views.get_users),
    path('get_user/<str:_login>', views.get_user_by_id),
    path('rest', UserView.as_view(), name="anything"),
    path('rest1', UserCreateView.as_view(), name="any"),
    path('rest/<str:login>', UserView.as_view(), name="get_user_by_id"),
    # path('rest1', UserCreateView.as_view(), name="ab"),
    
]


# from django.conf import settings
# from django.conf.urls.static import static

# if settings.DEBUG:
#         urlpatterns += static(settings.MEDIA_URL,
#                               document_root=settings.MEDIA_ROOT)
        

