# Generated by Django 4.1.3 on 2022-11-25 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0007_rename_leader name_leaderboard_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='score',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Leaderboard',
        ),
    ]
