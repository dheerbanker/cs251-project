# Generated by Django 4.1.3 on 2022-11-24 06:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0003_rename_player name_player_player_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lobby',
            old_name='Entry Code',
            new_name='code',
        ),
    ]
