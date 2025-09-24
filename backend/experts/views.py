from rest_framework import viewsets
from .models import Expert
from .serializers import ExpertSerializer

class ExpertViewSet(viewsets.ModelViewSet):
    queryset = Expert.objects.all().order_by("-id")
    serializer_class = ExpertSerializer
