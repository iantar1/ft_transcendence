# accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # email = models.EmailField(unique=True)
    # image = models.ImageField(upload_to ='image/')
    image = models.TextField(null=True)
    user_id = models.IntegerField(null=True)
    

    # # Add custom fields here, if needed

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)  # Save the image first

    #     # Now modify the image field to store only the relative path
    #     if self.image:
    #         self.image = self.image.name  # This will store only the relative path
    #         super().save(update_fields=['image'])  #

    def __str__(self):
        return self.username