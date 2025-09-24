from rest_framework import serializers
from .models import SuccessStory

class SuccessStorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, allow_null=True, required=False)

    class Meta:
        model = SuccessStory
        fields = "__all__"
