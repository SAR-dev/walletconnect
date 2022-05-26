from django.urls import path
from .views import TweetListCreateView, TweetRetrieveUpdateDestroyView

urlpatterns = [
    path("", TweetListCreateView.as_view(), name="tweets_list"),
    path("<int:pk>/", TweetRetrieveUpdateDestroyView.as_view(), name="tweets_detail")
]
