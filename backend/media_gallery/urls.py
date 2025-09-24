from rest_framework.routers import DefaultRouter
from .views import MediaPersonViewSet, GalleryItemViewSet

router = DefaultRouter()
router.register("media-persons", MediaPersonViewSet)
router.register("gallery-items", GalleryItemViewSet)

urlpatterns = router.urls
