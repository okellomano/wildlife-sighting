from rest_framework import generics
from rest_framework.filters import SearchFilter

from .models import Sightings
from .serializers import SightingsSerializer


class AllSightings(generics.ListAPIView):
    queryset = Sightings.objects.all()
    serializer_class = SightingsSerializer
    # filter_backends = [SearchFilter]
    # search_fields = ['animal_species']

    def get_queryset(self):
        queryset = super().get_queryset()
        animal_species = self.request.query_params.get('animal_species')

        if animal_species:
            queryset = queryset.filter(animal_species__iexact=animal_species)

        return queryset


class SightingsDetail(generics.RetrieveAPIView):
    queryset = Sightings.objects.all()
    serializer_class = SightingsSerializer
