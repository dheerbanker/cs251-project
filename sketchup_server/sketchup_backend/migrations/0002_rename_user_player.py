# Generated by Django 4.1.3 on 2022-11-23 21:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sketchup_backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Player',
        ),
    ]