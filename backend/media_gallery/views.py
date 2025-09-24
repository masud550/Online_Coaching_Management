from rest_framework import viewsets
from .models import MediaPerson, GalleryItem
from .serializers import MediaPersonSerializer, GalleryItemSerializer

class MediaPersonViewSet(viewsets.ModelViewSet):
    queryset = MediaPerson.objects.all()
    serializer_class = MediaPersonSerializer

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all().order_by("-created_at")
    serializer_class = GalleryItemSerializer
