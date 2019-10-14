from django.db import models

# Create your models here.
class Team(models.Model):
    DIV_CHOICES=(('Atlantic','Atlantic'), ('Metropolitan', 'Metropolitan'),('Pacific','Pacific'), ('Central','Central'))
    city = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    nhl_api_id = models.IntegerField(null=True)
    division = models.CharField(max_length=50, null=True, choices=DIV_CHOICES)
    def __str__(self):
        return (f"{self.city} {self.name}")

class TeamRecords(models.Model):
    STREAK_CHOICES=(('wins', 'wins'),('losses', 'losses'), ('ot', 'ot'))
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_record')
    wins = models.IntegerField()
    losses = models.IntegerField()
    ot = models.IntegerField()
    row = models.IntegerField()
    goals_against = models.IntegerField()
    goals_scored = models.IntegerField()
    points = models.IntegerField()
    games_played = models.IntegerField()
    streak_type = models.CharField(max_length=10)
    streak_length = models.IntegerField()
    wild_card_rank = models.IntegerField()
    season = models.CharField(max_length=50)
    last_updated = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return ('{} {} - W:{} L:{} OT:{}'.format(self.team.city,self.team.name,self.wins,self.losses,self.ot))

    class Meta:
        ordering = ('-points',)