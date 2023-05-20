from django.urls import path

from .views import AllSightings, SightingsDetail

urlpatterns = [
    path('all/', AllSightings.as_view()),
    path('<int:pk>/', SightingsDetail.as_view()),
]
