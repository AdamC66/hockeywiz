# Generated by Django 2.2.6 on 2019-12-05 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0005_auto_20191205_1736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stats',
            name='sv_pct',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
