# backend/home/views.py
from rest_framework import viewsets
from .models import Headline, Banner, Marketplace, Client
from .serializers import HeadlineSerializer, BannerSerializer, MarketplaceSerializer, ClientSerializer

class HeadlineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Headline.objects.order_by('-created_at')
    serializer_class = HeadlineSerializer

class BannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Banner.objects.order_by('-created_at')
    serializer_class = BannerSerializer

class MarketplaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Marketplace.objects.order_by('id')
    serializer_class = MarketplaceSerializer

class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Client.objects.order_by('id')
    serializer_class = ClientSerializer
