import requests
from models import TeamRecords
from datetime import datetime as dt

data = requests.get('https://statsapi.web.nhl.com/api/v1/standings').json['records']
team_records = TeamRecords.objects.all()

for division in data:
    for team in division['teamRecords']:
        try:
            records_to_update = TeamRecords.objects.get(team__nhl_api_id = team[team][id])
        except Model.DoesNotExist:
            records_to_update = TeamRecords.obkjects.create

        records_to_update['team'] = team.objects.get(nhl_api_id=team['team']['id'])
        records_to_update['wins'] = team['leagueRecord']['wins']
        records_to_update['losses'] = team['leagueRecord']['losses']
        records_to_update['ot'] = team['leagueRecord']['ot']
        records_to_update['row'] = team['row']
        records_to_update['goals_against'] = team['goalsAgainst']
        records_to_update['goals_scored'] = team['goalsScored']
        records_to_update['points'] = team['points']
        records_to_update['games_played'] = team['gamesPlayed']
        records_to_update['streak_type'] = team['streak']['streakType']
        records_to_update['streak_length'] = team['streak']['streakNumber']
        records_to_update['wild_card_rank']=team['wildCardRank']
        records_to_update['season'] = ['20192020']
        records_to_update['last_updated'] = dt.now()
        records_to_update.save()