from django.db import models
from teams import models as team_models

# Create your models here.
class Player(models.Model):
    POS_CHOICES=(('Forward','Forward'), ('Defenceman', 'Defenceman'),('Goalie','Goalie'))
    full_name = models.CharField(max_length=255)
    nhl_api_id = models.IntegerField()
    jersey_number = models.IntegerField()
    position_code = models.CharField(max_length=1)
    position_name = models.CharField(max_length=31)
    position_type = models.CharField(max_length=31, choices=POS_CHOICES)
    position_abbv = models.CharField(max_length=3)
    current_team = models.ForeignKey(team_models.Team, on_delete=models.CASCADE, related_name='players')

    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    birth_date = models.CharField(max_length=255, null=True, blank=True)
    current_age = models.IntegerField(null=True, blank=True)
    birth_city = models.CharField(max_length=255, null=True, blank=True)
    birth_state_province = models.CharField(max_length=255, null=True, blank=True)
    birth_country = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.CharField(max_length=255, null=True, blank=True)
    height = models.CharField(max_length=255, null=True, blank=True)
    wieght = models.IntegerField(null=True, blank=True)
    active = models.BooleanField(null=True, blank=True)
    alternate_captain = models.BooleanField(null=True, blank=True)
    captain = models.BooleanField(null=True, blank=True)
    rookie = models.BooleanField(null=True, blank=True)
    shoots_catches = models.CharField(max_length=5, null=True, blank=True)
    roster_status = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
        return(f'{self.full_name}, {self.current_team.name}')