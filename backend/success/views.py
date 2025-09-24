from rest_framework import viewsets
from .models import SuccessStory
from .serializers import SuccessStorySerializer
from rest_framework.permissions import AllowAny

class SuccessStoryViewSet(viewsets.ModelViewSet):
    queryset = SuccessStory.objects.all().order_by('-created_at')
    serializer_class = SuccessStorySerializer
    permission_classes = [AllowAny]  
