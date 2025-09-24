# backend/home/urls.py
from rest_framework.routers import DefaultRouter
from .views import HeadlineViewSet, BannerViewSet, MarketplaceViewSet, ClientViewSet

router = DefaultRouter()
router.register("headlines", HeadlineViewSet, basename="home-headlines")
router.register("banners", BannerViewSet, basename="home-banners")
router.register("marketplaces", MarketplaceViewSet, basename="home-marketplaces")
router.register("clients", ClientViewSet, basename="home-clients")

urlpatterns = router.urls
