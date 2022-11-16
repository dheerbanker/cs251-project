from django.shortcuts import render
from django.views import View
# Create your views here.

class LobbyView(View):
    def post(self, request):
        # meant to take in the lobby code as a parameter,
        # return failure signal if the lobby not found
        # return success signal if the lobby is found
        pass

    def put(self, request):
        # meant as a signal for the creation of a new room
        # on success, return back the lobby code
        # on failure, return an error code
        pass