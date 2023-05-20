from rest_framework import serializers

from .models import Sightings


class SightingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sightings
        fields = ('id', 'animal_species', 'sighting_datetime')
