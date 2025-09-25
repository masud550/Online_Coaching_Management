# backend/backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')), 
    path('api/home/', include('home.urls')), 
    path('api/success/', include('success.urls')),
    path('api/users/', include('users.urls')),
    path('api/services/', include('services.urls')),
    path('api/experts/', include('experts.urls')),
   path('api/', include('media_gallery.urls')),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
