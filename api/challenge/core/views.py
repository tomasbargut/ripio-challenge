from django.http.response import Http404
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny
from .serializers import CuentaSerializer, MonedaSerializer, UserSerializer
from .models import Cuenta, Moneda
from django.contrib.auth.models import User
from rest_framework_extensions.mixins import NestedViewSetMixin

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CuentaViewset(viewsets.ModelViewSet):
    queryset = Cuenta.objects.all().select_related('user')
    serializer_class = CuentaSerializer
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = super().get_queryset()
        moneda = self.request.query_params.get('moneda')
        if moneda is not None:
            queryset = queryset.filter(moneda=moneda)

        exclude = self.request.query_params.get('exclude')
        if exclude is not None:
            queryset = queryset.exclude(pk=exclude)
            
        return queryset


class UserCuentaViewSet(NestedViewSetMixin, CuentaViewset):
    def perform_create(self, serializer):
        user = User.objects.get(pk=self.get_parents_query_dict()['user'])
        serializer.save(user=user)


class MonedaViewset(viewsets.ModelViewSet):
    queryset = Moneda.objects.all()
    serializer_class = MonedaSerializer
