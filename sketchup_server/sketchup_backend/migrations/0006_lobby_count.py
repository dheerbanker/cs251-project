# Generated by Django 4.1.3 on 2022-11-25 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0005_lobby_curr_drawer_player_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='lobby',
            name='count',
            field=models.IntegerField(default=0),
        ),
    ]
