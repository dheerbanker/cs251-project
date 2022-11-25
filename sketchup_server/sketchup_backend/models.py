from django.db import models
import django.utils.timezone as tz
import datetime

# Create your models here.

class Lobby(models.Model):
    def __str__(self):
        return self.code
    code = models.CharField(max_length=32, primary_key=True)
    curr_drawer = models.CharField(max_length=64,default='null')
    count = models.IntegerField(default=0)
    word = models.CharField(max_length=100, default="null")
    first_drawer = models.CharField(max_length=100, default="")
    creation_time = models.DateTimeField(null=True, auto_created=True)

class Player(models.Model):
    def __str__(self):
        return self.player_name 
    player_name = models.CharField(max_length=64)
    code = models.ForeignKey(Lobby, null=True, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

class Leaderboard(models.Model):
    player_name = models.CharField(max_length=100)
    score = models.IntegerField(default = -1)