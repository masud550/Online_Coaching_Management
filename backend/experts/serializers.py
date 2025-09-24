from rest_framework import serializers
from .models import Expert, Portfolio

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = "__all__"

class ExpertSerializer(serializers.ModelSerializer):
    portfolio = PortfolioSerializer(many=True, read_only=True)

    class Meta:
        model = Expert
        fields = "__all__"
