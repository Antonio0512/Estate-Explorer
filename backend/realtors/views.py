from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import RealtorSerializer

from .models import Realtor
from listings.models import Listing
from listings.serializers import ListingSerializer


class RealtorListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer


class RealtorView(RetrieveAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer


class TopSellerView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Realtor.objects.filter(top_seller=True)
    serializer_class = RealtorSerializer


class ListingsByRealtorListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingSerializer

    def get_queryset(self):
        realtor_id = self.kwargs.get('pk')
        return Listing.objects.filter(id=realtor_id)
