from django.contrib import admin

from .models import Sightings


class SightingsAdmin(admin.ModelAdmin):
    list_display = ('animal_species', 'sighting_datetime')

admin.site.register(Sightings, SightingsAdmin)
