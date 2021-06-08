from rest_framework.decorators import permission_classes
import logging

from .serializers import TransaccionSerializer
from .models import Transaccion
from rest_framework import viewsets
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from django.db.models import Q
# Create your views here.

logger = logging.getLogger(__name__)

class TransaccionesViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cuenta = self.request.query_params.get('cuenta')
        if cuenta:
            qs = qs.filter(Q(emisor__pk=cuenta) | Q(receptor__pk=cuenta))
        return qs