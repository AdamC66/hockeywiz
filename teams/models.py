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
