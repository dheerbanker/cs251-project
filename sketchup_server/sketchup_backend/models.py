from django.db import models

# Create your models here.

class Lobby(models.Model):
    code = models.CharField(name="Entry Code", primary_key=True)

class User(models.Model):
    name = models.CharField(name="Player Name", max_length=64)

class Leaderboard(models.Model):
    user = models.ForeignObject(User, name="Leader Name", on_delete=models.CASCADE)
    score = models.IntegerField(name="High Score")
    when = models.DateField(name="Date of Leading")