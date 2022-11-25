from django.db import models

# Create your models here.

class Lobby(models.Model):
    def __str__(self):
        return self.code
    code = models.CharField(max_length=32, primary_key=True)
    curr_drawer = models.CharField(max_length=64,default='NULL')
    count = models.IntegerField(default=0)
    word = models.CharField(max_length=100, default="null")
    first_drawer = models.CharField(max_length=100, default="")

class Player(models.Model):
    def __str__(self):
        return self.player_name 
    player_name = models.CharField(max_length=64)
    code = models.ForeignKey(Lobby, null=True, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
