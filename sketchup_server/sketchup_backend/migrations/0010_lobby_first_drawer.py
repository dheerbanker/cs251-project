# Generated by Django 4.1.3 on 2022-11-25 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0009_lobby_word'),
    ]

    operations = [
        migrations.AddField(
            model_name='lobby',
            name='first_drawer',
            field=models.CharField(default='', max_length=100),
        ),
    ]
