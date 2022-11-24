from django.db import models

# Create your models here.

class Lobby(models.Model):
    def __str__(self):
        return self.code
    code = models.CharField(max_length=32, primary_key=True)

class Player(models.Model):
    def __str__(self):
        return self.player_name 
    player_name = models.CharField(name="player_name",max_length=64)

class Leaderboard(models.Model):
    user = models.ForeignKey(Player, name="Leader Name", on_delete=models.CASCADE)
    score = models.IntegerField(name="High Score")
    when = models.DateField(name="Date of Leading")