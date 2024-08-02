from django.urls import path, include
from auth import views

urlpatterns = [
    path('', views.auth),
    path('api', views.api),
    path('home', views.home),
    path('add_user', views.add_user),
    path('get_users', views.get_users),
    path('get_user/<str:_login>', views.get_user_by_id),
]


from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)