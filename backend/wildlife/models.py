from django.db import models
from django.utils.timezone import now

class Sightings(models.Model):
    sighting_datetime = models.DateTimeField(default=now)
    animal_species = models.CharField(max_length=100)
