# Generated by Django 4.1.3 on 2022-11-25 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0008_player_score_delete_leaderboard'),
    ]

    operations = [
        migrations.AddField(
            model_name='lobby',
            name='word',
            field=models.CharField(default='null', max_length=100),
        ),
    ]
