import graphene
from graphene_django.types import DjangoObjectType
from .models import *
import requests
import datetime
class TeamRecordType(DjangoObjectType):
    class Meta:
        model = TeamRecords

class TeamType(DjangoObjectType):
    class Meta:
        model = Team

class Query(graphene.ObjectType):
    all_team_records = graphene.List(TeamRecordType)
    all_teams = graphene.List(TeamType)
    team = graphene.Field(TeamType, id=graphene.Int(), name=graphene.String(), nhl_api_id=graphene.Int())
    
    def resolve_all_team_records(self, info, **kwargs):
        queryset = TeamRecords.objects.all()
        if not queryset or queryset.first().last_updated.replace(tzinfo=None) <= (datetime.datetime.now().replace(tzinfo=None) - datetime.timedelta(hours=6)):
            updatedata()
        return queryset

    def resolve_all_teams(self, info, **kwargs):
        return Team.objects.all()
    
    def resolve_team(self, info, **kwargs):
        id= kwargs.get('id')
        name = kwargs.get('name')
        nhl_api_id= kwargs.get('nhl_api_id')

        if id is not None:
            return Team.objects.filter(pk=id).first()
        
        if name is not None:
            return Team.objects.filter(name__icontains=name).first()
        
        if nhl_api_id is not None:
            return Team.objects.filter(nhl_api_id=nhl_api_id).first()

def updatedata():
    nhldata = requests.get('https://statsapi.web.nhl.com/api/v1/standings').json()['records']
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
            records_to_update.wins = team['leagueRecord']['wins']
            records_to_update.losses = team['leagueRecord']['losses']
            records_to_update.ot = team['leagueRecord']['ot']
            records_to_update.row = team['row']
            records_to_update.goals_against = team['goalsAgainst']
            records_to_update.goals_scored = team['goalsScored']
            records_to_update.points = team['points']
            records_to_update.games_played = team['gamesPlayed']
            records_to_update.streak_type = team['streak']['streakType']
            records_to_update.streak_length = team['streak']['streakNumber']
            records_to_update.wild_card_rank=team['wildCardRank']
            records_to_update.last_updated = datetime.datetime.now()
            records_to_update.save()