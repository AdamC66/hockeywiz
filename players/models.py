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