from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Cuenta, Moneda


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class MonedaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moneda
        fields = '__all__'


class CuentaSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Cuenta
        fields = ['id', 'monto', 'moneda', 'user']
        read_only_fields = ['user']
