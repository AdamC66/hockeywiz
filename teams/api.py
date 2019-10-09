import logging
import os
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, parsers
from django.db.models import Q

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny,]

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (permissions.AllowAny,)
        return super(TeamViewSet, self).get_permissions()

    def list(self, request, id=None):
        queryset = Team.objects.all()
        if id:
            queryset = queryset.filter(id=id)
        serializer = TeamSerializer(queryset, many = True)
        return Response(serializer.data)
