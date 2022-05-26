from rest_framework import generics
from .models import Tweet
from .serializers import TweetSerializer

class TweetListCreateView(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

class TweetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer