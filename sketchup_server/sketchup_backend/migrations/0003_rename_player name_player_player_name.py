# Generated by Django 4.1.3 on 2022-11-24 06:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0002_rename_user_player'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='Player Name',
            new_name='player_name',
        ),
    ]
