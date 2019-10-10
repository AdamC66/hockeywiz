# Generated by Django 2.2.6 on 2019-10-10 16:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0003_auto_20191009_1827'),
    ]

    operations = [
        migrations.CreateModel(
            name='TeamRecords',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('ot', models.IntegerField()),
                ('row', models.IntegerField()),
                ('goals_against', models.IntegerField()),
                ('goals_scored', models.IntegerField()),
                ('points', models.IntegerField()),
                ('games_played', models.IntegerField()),
                ('streak_type', models.CharField(choices=[('wins', 'wins'), ('losses', 'losses'), ('ot', 'ot')], max_length=10)),
                ('streak_length', models.IntegerField()),
                ('wild_card_rank', models.IntegerField()),
                ('season', models.CharField(max_length=50)),
                ('last_updated', models.DateTimeField(auto_now_add=True)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team_record', to='teams.Team')),
            ],
        ),
    ]
