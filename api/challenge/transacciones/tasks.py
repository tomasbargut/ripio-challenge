import logging
from challenge.celery import app
from .models import Transaccion, TransaccionChoices

from django.db import transaction

logger = logging.getLogger(__name__)

@app.task()
def procesar_transaccion(transaccion_id):
    transaccion = Transaccion.objects.filter(
        pk=transaccion_id).select_related('emisor', 'receptor').first()

    if not transaccion:
        return

    emisor = transaccion.emisor
    receptor = transaccion.receptor

    if emisor.monto < transaccion.monto:
        transaccion.estado = TransaccionChoices.RECHAZADA
        transaccion.save()
        return

    with transaction.atomic():
        emisor.monto -= transaccion.monto
        emisor.save()
        receptor.monto += transaccion.monto
        receptor.save()
        transaccion.estado = TransaccionChoices.REALIZADA
        transaccion.save()

    proxima_transaccion = Transaccion.objects.filter(
        emisor=emisor, estado=TransaccionChoices.PROCESANDO).first()

    if proxima_transaccion:
        procesar_transaccion.delay(procesar_transaccion.pk)
