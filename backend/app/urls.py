from django.urls import path
from . import views

urlpatterns = [
    # This is how an url is created in django, we've imported home view from views.py
  path('', views.home, name='home'),
]
 
