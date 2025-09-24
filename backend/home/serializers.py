# backend/home/serializers.py
from rest_framework import serializers
from .models import Headline, Banner, Marketplace, Client

class HeadlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Headline
        fields = "__all__"

class BannerSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Banner
        fields = "__all__"

class MarketplaceSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Marketplace
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Client
        fields = "__all__"
