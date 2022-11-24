from django.shortcuts import render
import json
from django.http import HttpResponse, QueryDict
from django.views import View
from .models import Player, Lobby
import re

class LobbyView(View):
    def lobby_name_constraint(self,name):
        if(len(name) != 6):
            # return HttpResponse("provide a valid lobby code", status=403)
            return False
        if(re.search(r"[a-z]{6}",name)):
            return True
        return False
    def post(self, request):
        # meant to take in the lobby code as a parameter,
        # return failure signal if the lobby not found
        # return success signal if the lobby is found
        if(not self.lobby_name_constraint(request.POST['code'])):
            return HttpResponse("provide a valid lobby code", status=403)

        if request.POST['action'] == "create":
            req_code = request.POST['code']
            try:
                Lobby.objects.get(code=req_code) 
                return HttpResponse("joined the lobby",status=200)
            except Lobby.DoesNotExist as e:
                return HttpResponse("Lobby does not exist", status=403)
        else:
            req_code = request.POST['code']
            try:
                Lobby.objects.get(code=req_code) 
                return HttpResponse("Lobby already exists",status=403)
            except Lobby.DoesNotExist as e:
                Lobby.objects.create(code = req_code)
                return HttpResponse("lobby creation successful",status=200)

        

    # def put(self, request):
    #     # req_code = request.POST['code']
    #     qd = QueryDict(request.body)
    #     print(qd)
    #     req_code = request.POST['code']
    #     try:
    #        Lobby.objects.get(code=req_code) 
    #        return HttpResponse("Lobby already exists",status=403)
    #     except Lobby.DoesNotExist as e:
    #         Lobby.objects.create(code = req_code)
    #         return HttpResponse("lobby creation successful",status=200)

class LoginView(View):
    def post(self, request):
        username = request.POST['username']
        # for user in User.objects.all('Select * from auth_user'):
        # for user in User.objects.all():

            # print(user)
        try:
            Player.objects.get(player_name = username)
            return HttpResponse("Username already exists",status=403)
        except Player.DoesNotExist as e:
            Player.objects.create(player_name = username)
            return HttpResponse("Acknowledge", status=200)