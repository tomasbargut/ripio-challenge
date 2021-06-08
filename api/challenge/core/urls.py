from django.conf.urls import url
from django.urls.conf import include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers
from .views import UserViewset, CuentaViewset, MonedaViewset, UserCuentaViewSet

from rest_framework_extensions.routers import ExtendedDefaultRouter


router = ExtendedDefaultRouter()

(router.register('user', UserViewset)
        .register('cuenta',UserCuentaViewSet, 'user-cuenta', parents_query_lookups=['user']))
router.register('moneda', MonedaViewset)
router.register('cuenta', CuentaViewset)


urlpatterns = router.urls