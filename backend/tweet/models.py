from django.db import models
from django.contrib.auth.models import User

class Tweet(models.Model):
    desc = models.TextField(max_length=1000)
    pub_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.desc
