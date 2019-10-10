from rest_framework import serializers
from .models import *

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'city', 'name', 'division')

class TeamRecordSerializer(serializers.ModelSerializer):
    team = TeamSerializer()
    class Meta:
        model = TeamRecords
        fields = ('team', 'wins', 'losses', 'ot', 'row', 'goals_against', 'goals_scored', 'points', 'games_played', 'streak_type', 'streak_length', 'wild_card_rank', 'season', 'last_updated')