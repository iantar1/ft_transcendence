from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # image = models.ImageField(upload_to ='image/')
    username = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to='images', default='/images/default.png')
    email = models.EmailField(unique=True)
    otp =  models.CharField(max_length = 6, null = True, blank=True)
    otp_expiry_time = models.DateTimeField(null=True, blank=True)
    # logged_in =   models.BooleanField(default = False)
    #a one to one relationship 
    

class Stats(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
#if a User object is deleted, all related Stats objects will also be deleted.
    wins = models.CharField(max_length=500, null=True)
    losses = models.CharField(max_length=500,null=True)

    def __str__(self):
        return self.name

class MatchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
#on_delete=models.CASCADE: if a User object is deleted, all related MatchHistory objects will also be deleted.
    tmp_text = models.CharField(max_length=500, null=True)
    # 1v1 games, dates, and relevant details
    
    def __str__(self):
        return self.name


class frinds(models.Model):
    pass

