from rest_framework.routers import DefaultRouter
from .views import SuccessStoryViewSet

router = DefaultRouter()
router.register("stories", SuccessStoryViewSet, basename="successstory")

urlpatterns = router.urls
