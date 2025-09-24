from rest_framework import serializers
from .models import MediaPerson, GalleryItem

class MediaPersonSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = MediaPerson
        fields = "__all__"


class GalleryItemSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = GalleryItem
        fields = "__all__"
