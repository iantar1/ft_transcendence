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



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)
    

    def get_friends(self):
        return self.friends.all()
    
    def get_friends_number(self):
        return self.friends.all().count()
    
    def __str__(self):
        return str(self.user)
    
STATUS_CHOICES = {
    ('send', 'send'),
    ('accepted', 'accepted'),
}

class Relationship(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile,  on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
        
    def __str__(self):
        return f"{self.sender}-{self.receiver}-{self.status}"

    
    
    
# class Friendship(models.Model):
    
    
    
    
    
    
    
# class friendships(models.Model):
#     #user1
#     #user2
#     #state frind: treu , blocked: false, 
#     pass


# class Friendship(models.Model):
    
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
#     friends = models.ManyToManyField(User, blank=True, related_name="friends")
    
#     def __str__(self):
#         return self.user.username
    
#     def add_friend(self, account):
#         if not account in self.friends.all():
#             self.friends.add(account)
#             self.save()
    
#     def remove_friend(self, account):
#         if account in self.friends.all():
#             self.frerinds.add(account)

             

