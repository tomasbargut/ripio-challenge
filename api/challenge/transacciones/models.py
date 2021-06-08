from django.db import models
from django.utils.translation import ugettext as _


class TransaccionChoices(models.IntegerChoices):
    PROCESANDO = 0
    REALIZADA = 1
    RECHAZADA = 2


class Transaccion(models.Model):
    monto = models.FloatField(verbose_name=_("monto"))
    emisor = models.ForeignKey(
        "core.Cuenta", related_name='transacciones_realizada', verbose_name=_("Emisor"), on_delete=models.CASCADE)
    receptor = models.ForeignKey(
        "core.Cuenta", related_name='transacciones_recibidas', verbose_name=_("Receptor"), on_delete=models.CASCADE)
    estado = models.IntegerField(verbose_name=_(
        "Estado"), choices=TransaccionChoices.choices, default=TransaccionChoices.PROCESANDO)
    fecha = models.DateTimeField(verbose_name=_(
        "Fecha de realizacion"), auto_now=True)

    class Meta:
        ordering = ['-fecha']
