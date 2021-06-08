from rest_framework import routers
from .views import TransaccionesViewSet
router = routers.DefaultRouter()

router.register('', TransaccionesViewSet)

urlpatterns = router.urls