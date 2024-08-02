from django.apps import AppConfig


class AuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auth'


class CustomAuthConfig(AppConfig):
    name = 'auth'
    label = 'custom_auth'