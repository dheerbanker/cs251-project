# Generated by Django 4.1.3 on 2022-11-25 13:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0006_lobby_count'),
    ]

    operations = [
        migrations.RenameField(
            model_name='leaderboard',
            old_name='Leader Name',
            new_name='user',
        ),
    ]
