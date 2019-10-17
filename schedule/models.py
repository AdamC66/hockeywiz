from django.db import models
from teams import models as team_models
# Create your models here.
class Game(models.Model):
    home_team = models.ForeignKey(team_models.Team, on_delete=models.CASCADE, related_name='home_game')
    home_team_status = models.IntegerField(null=True, blank=True)
    away_team = models.ForeignKey(team_models.Team, on_delete=models.CASCADE, related_name='away_game')
    away_team_status = models.IntegerField(null=True, blank=True)
    date = models.DateTimeField()
    venue = models.CharField(max_length=100)
    game_pk=models.IntegerField()
    link = models.CharField(max_length=200)
    final_score_home = models.IntegerField(null=True, blank=True)
    final_score_away = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=50)
    last_updated=models.DateTimeField()

    def __str__(self):
        return ("{} @ {} - {}".format(self.away_team.name, self.home_team.name, self.date))
    class Meta:
        ordering = ('date',)