import logging

from django.core.exceptions import ValidationError
from rest_framework import serializers

from challenge.core.models import Cuenta
from .models import Transaccion, TransaccionChoices
from django.db.models import Count
from django.utils.translation import ugettext as _
from .tasks import procesar_transaccion

logger = logging.getLogger(__name__)

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = ['id', 'monto', 'emisor', 'receptor',
                  'estado', 'fecha']
        read_only_fields = ['estado']

    def validate(self, attrs):
        is_same_account_type = (Cuenta.objects
                                .filter(moneda__in=[attrs['emisor'].moneda,
                                                    attrs['receptor'].moneda])
                                .annotate(count=Count('moneda__pk'))
                                .filter(count=1).exists())
        if not is_same_account_type:
            raise ValidationError(_("Las cuentas no son de la misma moneda"))
        return super().validate(attrs)

    def create(self, validated_data):
        emisor_has_processing_trans = Transaccion.objects.filter(
            emisor_id=validated_data['emisor'], estado=TransaccionChoices.PROCESANDO).exists()
        transaccion = super().create(validated_data)
        if not emisor_has_processing_trans:
            procesar_transaccion.delay(transaccion.pk)
        return transaccion
