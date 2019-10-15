import graphene
from graphene_django.types import DjangoObjectType
from .models import *
import requests
import datetime
from teams.models import Team
from django.db.models import Q
class GameType(DjangoObjectType):
    class Meta:
        model = Game


class Query(graphene.ObjectType):
    all_games = graphene.List(GameType, team_name=graphene.String())

    def resolve_all_games(self, info, **kwargs):
        team_name = kwargs.get('team_name')
        if team_name:
            return Game.objects.filter(Q(home_team__name__icontains=(team_name))| Q(away_team__name__icontains=(team_name)))
        queryset = Game.objects.all()
        if not queryset or queryset.first().last_updated.replace(tzinfo=None) <= (datetime.datetime.now().replace(tzinfo=None) - datetime.timedelta(hours=6)):
            updatedata()
        return queryset

def updatedata():
    nhl_data = requests.get("https://statsapi.web.nhl.com/api/v1/schedule?startDate=2019-10-03&endDate=2020-04-12").json()
    for date in nhl_data["dates"]:
        for game in date["games"]:
            if Game.objects.filter(game_pk=game["gamePk"]):
                pass
            else:
                home_team_id = game["teams"]["home"]["team"]["id"]
                away_team_id = game["teams"]["away"]["team"]["id"]
                new_game = Game.objects.create(
                    home_team = Team.objects.get(nhl_api_id =home_team_id),
                    away_team =Team.objects.get(nhl_api_id = away_team_id),
                    date = game["gameDate"],
                    venue = game["venue"]["name"],
                    game_pk= game["gamePk"],
                    link = game["link"],
                    status = game["status"]["detailedState"],            
                    last_updated= datetime.datetime.now()
                )
                if game["status"]["detailedState"] == 'Final':
                    new_game.final_score_away = game["teams"]["away"]["score"]
                    new_game.final_score_home = game["teams"]["home"]["score"]
                new_game.save()