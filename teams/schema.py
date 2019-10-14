import graphene
from graphene_django.types import DjangoObjectType
from .models import *

class TeamRecordType(DjangoObjectType):
    class Meta:
        model = TeamRecords

class TeamType(DjangoObjectType):
    class Meta:
        model = Team


class Query(graphene.ObjectType):
    all_team_records = graphene.List(TeamRecordType)
    all_teams = graphene.List(TeamType)

    def resolve_all_team_records(self, info, **kwargs):
        return TeamRecords.objects.all()
    
    def resolve_all_teams(self, info, **kwargs):
        return Team.objects.all()