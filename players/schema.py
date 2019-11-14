import graphene
from graphene_django.types import DjangoObjectType
from .models import *
from teams import models as team_models
import requests
import datetime
from teams.models import Team
from django.db.models import Q
from datetime import datetime, timedelta
import time

class PlayerType(DjangoObjectType):
    class Meta:
        model = Player

class Query(graphene.ObjectType):
    all_players = graphene.List(PlayerType, team_name=graphene.String())

    def resolve_all_players(self, info, **kwargs):
        player_name = kwargs.get('player_name')
        team_name = kwargs.get('team_name')
        if player_name:
            return Player.objects.filter(full_name=player_name)
        if team_name:
            return Player.objects.filter(current_team__name=team_name)
        queryset = Player.objects.all()
        return queryset

def updatedata():
    all_teams = team_models.Team.objects.all()
    for team in all_teams:
        time.sleep(3)
        roster_data = requests.get(f'https://statsapi.web.nhl.com/api/v1/teams/{team.nhl_api_id}/roster').json()
        for person in roster_data["roster"]:
            new_player = Player.objects.create(
                full_name = person['person']['fullName'],
                nhl_api_id = person['person']['id'],
                jersey_number = person['jerseyNumber'],
                position_code = person['position']['code'],
                position_name = person['position']['name'],
                position_type = person['position']['type'],
                position_abbv = person['position']['abbreviation'],
                current_team = team
            )
            new_player.save()