# Generated by Django 2.2.6 on 2019-12-05 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0004_stats_last_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='stats',
            name='ev_sv_pct',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='even_saves',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='even_shots',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='gaa',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='games_started',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='goals_against',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='losses',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='ot',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='pp_saves',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='pp_shots',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='pp_sv_pct',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='saves',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='sh_saves',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='sh_shots',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='sh_sv_pct',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='shots_against',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='shutouts',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='sv_pct',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='ties',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='toi_per_game',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='stats',
            name='wins',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='assists',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='blocked_shots',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='ev_toi',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='ev_toi_per_gm',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='face_off_pct',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='games',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='goals',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='gwg',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='hits',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='ot_goals',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='pim',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='plus_minus',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='points',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='pp_goals',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='pp_pts',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='pp_toi',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='pp_toi_per_gm',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='sh_goals',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='sh_points',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='sh_toi',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='sh_toi_per_gm',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='shifts',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='shot_pct',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='shots',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stats',
            name='toi_per_gm',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
