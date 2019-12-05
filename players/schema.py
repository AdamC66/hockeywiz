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
class StatType(DjangoObjectType):
        class Meta:
            model = Stats
class Query(graphene.ObjectType):
    all_players = graphene.List(PlayerType, team_name=graphene.String())
    statline = graphene.Field(StatType)
    def resolve_all_players(self, info, **kwargs):
        player_name = kwargs.get('player_name')
        team_name = kwargs.get('team_name')
        if player_name:
            return Player.objects.filter(full_name=player_name)
        if team_name:
            update_player(team_name)
            get_single_season_stats(team_name)
            return Player.objects.filter(current_team__name=team_name)
        queryset = Player.objects.all()
        return queryset
    def resolve_statline(self,info, **kwargs):
        pass
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

def update_player(team_name):
    all_players = Player.objects.filter(current_team__name=team_name)
    for player in all_players:
        if player.first_name:
            continue
        print(player.full_name)
        nhl_player_data = requests.get(f'https://statsapi.web.nhl.com/api/v1/people/{player.nhl_api_id}').json()
        player.first_name = nhl_player_data['people'][0]['firstName']
        player.last_name = nhl_player_data['people'][0]['lastName']
        player.birth_date = nhl_player_data['people'][0]['birthDate']
        player.current_age = nhl_player_data['people'][0]['currentAge']
        player.birth_city = nhl_player_data['people'][0]['birthCity']
        if 'birthStateProvince' in nhl_player_data['people'][0]:
            player.birth_state_province = nhl_player_data['people'][0]['birthStateProvince']
        player.birth_country = nhl_player_data['people'][0]['birthCountry']
        player.nationality = nhl_player_data['people'][0]['nationality']
        player.height = nhl_player_data['people'][0]['height']
        player.wieght = nhl_player_data['people'][0]['weight']
        player.active = nhl_player_data['people'][0]['active']
        player.alternate_captain = nhl_player_data['people'][0]['alternateCaptain']
        player.captain = nhl_player_data['people'][0]['captain']
        player.shoots_catches = nhl_player_data['people'][0]['shootsCatches']
        player.roster_status = nhl_player_data['people'][0]['rosterStatus']
        player.rookie = nhl_player_data['people'][0]['rookie']
        player.save()
        time.sleep(3)

def get_single_season_stats(team_name):
    print("updating Stats!")
    all_players = Player.objects.filter(current_team__name=team_name)
    for player in all_players:
        season = "20192020"
        data = requests.get(f'https://statsapi.web.nhl.com/api/v1/people/{player.nhl_api_id}/stats?stats=statsSingleSeason&season={season}').json()
        print(player.full_name)
        if player.statline.exists() and player.position_code != "G" and player.statline.filter(season="20192020").first().last_updated.replace(tzinfo=None) <= (datetime.now().replace(tzinfo=None) - timedelta(hours=6)):
            player.statline.season = data['stats'][0]['splits'][0]['season']
            player.statline.toi = data['stats'][0]['splits'][0]['stat']['timeOnIce']
            player.statline.assists = data['stats'][0]['splits'][0]['stat']['assists']
            player.statline.goals = data['stats'][0]['splits'][0]['stat']['goals']
            player.statline.points = data['stats'][0]['splits'][0]['stat']['points']
            player.statline.pim = data['stats'][0]['splits'][0]['stat']['pim']
            player.statline.shots = data['stats'][0]['splits'][0]['stat']['shots']
            player.statline.games = data['stats'][0]['splits'][0]['stat']['games']
            player.statline.hits = data['stats'][0]['splits'][0]['stat']['hits']
            player.statline.pp_goals = data['stats'][0]['splits'][0]['stat']['powerPlayGoals']
            player.statline.pp_pts =  data['stats'][0]['splits'][0]['stat']['powerPlayPoints']
            player.statline.pp_toi = data['stats'][0]['splits'][0]['stat']['powerPlayTimeOnIce']
            player.statline.ev_toi = data['stats'][0]['splits'][0]['stat']['evenTimeOnIce']
            player.statline.face_off_pct = data['stats'][0]['splits'][0]['stat']['faceOffPct']
            player.statline.shot_pct = data['stats'][0]['splits'][0]['stat']['shotPct']
            player.statline.gwg =  data['stats'][0]['splits'][0]['stat']['gameWinningGoals']
            player.statline.ot_goals = data['stats'][0]['splits'][0]['stat']['overTimeGoals']
            player.statline.sh_goals = data['stats'][0]['splits'][0]['stat']['shortHandedGoals']
            player.statline.sh_points = data['stats'][0]['splits'][0]['stat']['shortHandedPoints']
            player.statline.sh_toi = data['stats'][0]['splits'][0]['stat']['shortHandedTimeOnIce']
            player.statline.blocked_shots = data['stats'][0]['splits'][0]['stat']['blocked']
            player.statline.plus_minus = data['stats'][0]['splits'][0]['stat']['plusMinus']
            player.statline.shifts =data['stats'][0]['splits'][0]['stat']['shifts']
            player.statline.toi_per_gm = data['stats'][0]['splits'][0]['stat']['timeOnIcePerGame']
            player.statline.ev_toi_per_gm = data['stats'][0]['splits'][0]['stat']['timeOnIcePerGame'] 
            player.statline.sh_toi_per_gm = data['stats'][0]['splits'][0]['stat']['shortHandedTimeOnIcePerGame']
            player.statline.pp_toi_per_gm = data['stats'][0]['splits'][0]['stat']['powerPlayTimeOnIcePerGame']
            time.sleep(3)
        elif player.statline.exists() and player.position_code == "G" and player.statline.filter(season="20192020").first().last_updated.replace(tzinfo=None) <= (datetime.now().replace(tzinfo=None) - timedelta(hours=6)): 
            player.statline.season = data['stats'][0]['splits'][0]['season']
            player.statline.toi = data['stats'][0]['splits'][0]['stat']['timeOnIce']
            player.statline.ot= data['stats'][0]['splits'][0]['stat']['ot']
            player.statline.shutouts= data['stats'][0]['splits'][0]['stat']['shutouts']
            player.statline.ties= data['stats'][0]['splits'][0]['stat']['ties']
            player.statline.wins= data['stats'][0]['splits'][0]['stat']['wins']
            player.statline.losses= data['stats'][0]['splits'][0]['stat']['losses']
            player.statline.saves= data['stats'][0]['splits'][0]['stat']['saves']
            player.statline.pp_saves = data['stats'][0]['splits'][0]['stat']['powerPlaySaves']
            player.statline.sh_saves= data['stats'][0]['splits'][0]['stat']['shortHandedSaves']
            player.statline.even_saves= data['stats'][0]['splits'][0]['stat']['evenSaves']
            player.statline.sh_shots= data['stats'][0]['splits'][0]['stat']['shortHandedShots']
            player.statline.even_shots= data['stats'][0]['splits'][0]['stat']['evenShots']
            player.statline.pp_shots= data['stats'][0]['splits'][0]['stat']['powerPlayShots']
            player.statline.sv_pct= data['stats'][0]['splits'][0]['stat']['savePercentage']
            player.statline.gaa= data['stats'][0]['splits'][0]['stat']['goalAgainstAverage']
            player.statline.games= data['stats'][0]['splits'][0]['stat']['games']
            player.statline.games_started= data['stats'][0]['splits'][0]['stat']['gamesStarted']
            player.statline.shots_against= data['stats'][0]['splits'][0]['stat']['shotsAgainst']
            player.statline.goals_against= data['stats'][0]['splits'][0]['stat']['goalsAgainst']
            player.statline.toi_per_game=data['stats'][0]['splits'][0]['stat']['timeOnIcePerGame']
            player.statline.pp_sv_pct= data['stats'][0]['splits'][0]['stat']['powerPlaySavePercentage']
            player.statline.sh_sv_pct= data['stats'][0]['splits'][0]['stat']['shortHandedSavePercentage']
            player.statline.ev_sv_pct= data['stats'][0]['splits'][0]['stat']['evenStrengthSavePercentage']
            time.sleep(3)
        else:
            if player.statline.exists() == False and player.position_code != "G":
                new_statline = Stats.objects.create(
                    player= player,
                    season = data['stats'][0]['splits'][0]['season'],
                    toi = data['stats'][0]['splits'][0]['stat']['timeOnIce'],
                    assists = data['stats'][0]['splits'][0]['stat']['assists'],
                    goals = data['stats'][0]['splits'][0]['stat']['goals'],
                    points = data['stats'][0]['splits'][0]['stat']['points'],
                    pim = data['stats'][0]['splits'][0]['stat']['pim'],
                    shots = data['stats'][0]['splits'][0]['stat']['shots'],
                    games = data['stats'][0]['splits'][0]['stat']['games'],
                    hits = data['stats'][0]['splits'][0]['stat']['hits'],
                    pp_goals = data['stats'][0]['splits'][0]['stat']['powerPlayGoals'],
                    pp_pts =  data['stats'][0]['splits'][0]['stat']['powerPlayPoints'],
                    pp_toi = data['stats'][0]['splits'][0]['stat']['powerPlayTimeOnIce'],
                    ev_toi = data['stats'][0]['splits'][0]['stat']['evenTimeOnIce'],
                    face_off_pct = data['stats'][0]['splits'][0]['stat']['faceOffPct'],
                    shot_pct = data['stats'][0]['splits'][0]['stat']['shotPct'],
                    gwg =  data['stats'][0]['splits'][0]['stat']['gameWinningGoals'],
                    ot_goals = data['stats'][0]['splits'][0]['stat']['overTimeGoals'],
                    sh_goals = data['stats'][0]['splits'][0]['stat']['shortHandedGoals'],
                    sh_points = data['stats'][0]['splits'][0]['stat']['shortHandedPoints'],
                    sh_toi = data['stats'][0]['splits'][0]['stat']['shortHandedTimeOnIce'],
                    blocked_shots = data['stats'][0]['splits'][0]['stat']['blocked'],
                    plus_minus = data['stats'][0]['splits'][0]['stat']['plusMinus'],
                    shifts =data['stats'][0]['splits'][0]['stat']['shifts'],
                    toi_per_gm = data['stats'][0]['splits'][0]['stat']['timeOnIce'],
                    ev_toi_per_gm = data['stats'][0]['splits'][0]['stat']['timeOnIcePerGame'], 
                    sh_toi_per_gm = data['stats'][0]['splits'][0]['stat']['shortHandedTimeOnIcePerGame'],
                    pp_toi_per_gm = data['stats'][0]['splits'][0]['stat']['powerPlayTimeOnIcePerGame'],
                    )
                new_statline.save()
                time.sleep(3)
            elif player.statline.exists() == False and player.position_code == "G": 
                new_statline = Stats.objects.create(
                player = player,
                season = data['stats'][0]['splits'][0]['season'],
                toi = data['stats'][0]['splits'][0]['stat']['timeOnIce'],
                ot= data['stats'][0]['splits'][0]['stat']['ot'],
                shutouts= data['stats'][0]['splits'][0]['stat']['shutouts'],
                ties= data['stats'][0]['splits'][0]['stat']['ties'],
                wins= data['stats'][0]['splits'][0]['stat']['wins'],
                losses= data['stats'][0]['splits'][0]['stat']['losses'],
                saves= data['stats'][0]['splits'][0]['stat']['saves'],
                pp_saves = data['stats'][0]['splits'][0]['stat']['powerPlaySaves'],
                sh_saves= data['stats'][0]['splits'][0]['stat']['shortHandedSaves'],
                even_saves= data['stats'][0]['splits'][0]['stat']['evenSaves'],
                sh_shots= data['stats'][0]['splits'][0]['stat']['shortHandedShots'],
                even_shots= data['stats'][0]['splits'][0]['stat']['evenShots'],
                pp_shots= data['stats'][0]['splits'][0]['stat']['powerPlayShots'],
                sv_pct= data['stats'][0]['splits'][0]['stat']['savePercentage'],
                gaa= data['stats'][0]['splits'][0]['stat']['goalAgainstAverage'],
                games= data['stats'][0]['splits'][0]['stat']['games'],
                games_started= data['stats'][0]['splits'][0]['stat']['gamesStarted'],
                shots_against= data['stats'][0]['splits'][0]['stat']['shotsAgainst'],
                goals_against= data['stats'][0]['splits'][0]['stat']['goalsAgainst'],
                toi_per_game=data['stats'][0]['splits'][0]['stat']['timeOnIcePerGame'],
                pp_sv_pct= data['stats'][0]['splits'][0]['stat']['powerPlaySavePercentage'],
                sh_sv_pct= data['stats'][0]['splits'][0]['stat']['shortHandedSavePercentage'],
                ev_sv_pct= data['stats'][0]['splits'][0]['stat']['evenStrengthSavePercentage'],
                )
                new_statline.save()
                time.sleep(3)