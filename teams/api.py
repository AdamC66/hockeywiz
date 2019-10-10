import logging
import os
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, parsers
from django.db.models import Q
import requests
import datetime

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

class TeamRecordViewSet(viewsets.ModelViewSet):
    queryset = TeamRecords.objects.all()
    serializer_class = TeamRecordSerializer
    permission_classes = [permissions.AllowAny,]
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes=(permissions.AllowAny,)
        return super().get_permissions()

    def updatedata(self):
        nhldata = requests.get('https://statsapi.web.nhl.com/api/v1/standings').json()['records']
        team_records = TeamRecords.objects.all()
        for division in nhldata:
            for team in division['teamRecords']:
                try:
                    team_id = team['team']['id']
                    records_to_update = TeamRecords.objects.get(team__nhl_api_id = team_id)
                except TeamRecords.DoesNotExist:
                    team_id = team['team']['id']
                    records_to_update = TeamRecords.objects.create(
                        team = Team.objects.get(nhl_api_id=team_id),
                        wins = team['leagueRecord']['wins'],
                        losses = team['leagueRecord']['losses'],
                        ot = team['leagueRecord']['ot'],
                        row = team['row'],
                        goals_against = team['goalsAgainst'],
                        goals_scored = team['goalsScored'],
                        points = team['points'],
                        games_played = team['gamesPlayed'],
                        streak_type = team['streak']['streakType'],
                        streak_length = team['streak']['streakNumber'],
                        wild_card_rank=team['wildCardRank'],
                        season = '20192020',
                        last_updated = datetime.datetime.now()
                    )
                records_to_update.save()

    def list(self, request, id=None):
        queryset = TeamRecords.objects.all()
        if not queryset or queryset.first().last_updated.replace(tzinfo=None) <= (datetime.datetime.now().replace(tzinfo=None) - datetime.timedelta(days=1)):
            self.updatedata()
        if id:
            queryset = queryset.filter(id=id)
        serializer = TeamRecordSerializer(queryset, many = True)
        return Response(serializer.data)