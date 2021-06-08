from django.db import models
from django.utils.translation import ugettext as _
# Create your models here.

class Moneda(models.Model):
    nombre = models.CharField(verbose_name=_("nombre"), max_length=255)

    def __str__(self) -> str:
        return self.nombre

class Cuenta(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='cuentas')
    monto = models.IntegerField(verbose_name=_("Balance"), default=0)
    moneda = models.ForeignKey(Moneda, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.user.username} - {self.moneda.nombre}'