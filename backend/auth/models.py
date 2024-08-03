from typing import Any
from django.db import models
from jsonfield import JSONField

    


# class ImagesUri(models.Model):
#     default = models.CharField(max_length=3000)
#     large = models.CharField(max_length=3000)
#     medium = models.CharField(max_length=3000)
#     small = models.CharField(max_length=3000)
#     micro = models.CharField(max_length=3000)
    # user_data = models.ForeignKey(UserData, on_delete=models.CASCADE)
    # user_data = models.OneToOneField(UserData, )

class UserData(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    login = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    image = models.CharField(max_length=500, null=True)


    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"


    
# """
#     'image': {'link': 'https://cdn.intra.42.fr/users/460588001e70c03e56f0bb1a4ecd87cc/iantar.JPG',
#             'versions': {'large': 'https://cdn.intra.42.fr/users/bcbafec69d082d596ee4047e2037aebc/large_iantar.JPG',
#              'medium': 'https://cdn.intra.42.fr/users/b8d0326075cafe1fdd71d0b2c3579a5c/medium_iantar.JPG',
#              'small': 'https://cdn.intra.42.fr/users/afab29e36a499599ec28575cb126c876/small_iantar.JPG',
#              'micro': 'https://cdn.intra.42.fr/users/a1b9affc46f850d9c8a74d651a3c9d9a/micro_iantar.JPG'}
#             }
             
             
# """
