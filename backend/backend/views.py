#C:\Projects\online_coaching_management\backend\backend\views.py
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to the API root!"})
