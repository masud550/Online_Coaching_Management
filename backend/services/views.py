from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.permissions import AllowAny

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by("-id")
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
