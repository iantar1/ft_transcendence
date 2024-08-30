from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # image = models.ImageField(upload_to ='image/')
    username = models.CharField(max_length=50, unique=True)
    image_intra = models.TextField(null=True)
    email = models.EmailField(unique=True)
    

