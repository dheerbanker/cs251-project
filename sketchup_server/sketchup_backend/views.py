from django.shortcuts import render
import json
import random
from django.http import HttpResponse
from django.views import View
from .models import Player, Lobby
import re
import string

class LobbyView(View):
    # creates a new lobby
    # params required: player_name
    def lobby_name_constraint(self,name):
        if(len(name) != 6):
            return False
        if(re.search(r"[a-z]{6}",name)):
            return True
        return False

    def get(self,request):
        while True:
            lobby_name = ''.join(random.choices(string.ascii_lowercase, k=6))
            if not Lobby.objects.filter(code=lobby_name).count():
               break 
        Lobby.objects.create(code=lobby_name)
        req_player=Player.objects.get(player_name = request.GET['player_name'])
        req_player.code = Lobby.objects.get(code = lobby_name)
        req_player.save()
        # return HttpResponse(f"{"": {lobby_name}}",status=200)
        return HttpResponse(json.dumps(dict(lobby_code=lobby_name)),status=200)


    def post(self, request):
        # meant to take in the lobby code as a parameter,
        # return failure signal if the lobby not found
        # return success signal if the lobby is found

        # passed param: code , player_name
        if(not self.lobby_name_constraint(request.POST['code'])):
            return HttpResponse(json.dumps(dict(error="Please provide a valid lobby code")), status=400)

        req_code = request.POST['code']
        try:
            lobby = Lobby.objects.get(code=req_code) 
            player = Player.objects.get(player_name=request.POST['player_name'])
            player.code = lobby 
            player.save()
            # Player.objects.get(player_name=request.POST['player_name']).save()
            return HttpResponse(json.dumps(dict(message="Lobby joining successful")),status=200)
        except Lobby.DoesNotExist as e:
            return HttpResponse(json.dumps(dict(error="Lobby does not exist")), status=403)


class LoginView(View):
    # login with a new userid
    # params: player_name 
    def post(self, request):
        req_data = json.loads(request.body)
        username = req_data['player_name'] 
        try:
            Player.objects.get(player_name = username)
            return HttpResponse(json.dumps(dict(error="Username already exists")),status=403)
        except Player.DoesNotExist as e:
            Player.objects.create(player_name = username)
            return HttpResponse(json.dumps(dict(message="Acknowledge")), status=200)

class GamePlay(View):
    def get(self,request):
        req_code = request.GET['code']
        playerList = Player.objects.filter(code=req_code)
        curr_drawer =  playerList[random.randint(0,len(playerList)-1)].player_name
        lobby = Lobby.objects.get(code=req_code) 
        lobby.curr_drawer = curr_drawer 
        lobby.save()

        # player_score = [
        # return HttpResponse(curr_drawer,status=200)

    def post(self, request):
        req_data = json.loads(request.body)
        req_code = req_data.get('code', None)
        # format:
        # code : lsdfjl
        # players : [{
        #    player1 : 23
        #    player2 : 2342
        #    player3 : 0
        # }]


        for k in request.POST['players']:
            print(k)
        # print(request.POST['players'])
        # print(jsonData) 
        return HttpResponse("testing")


