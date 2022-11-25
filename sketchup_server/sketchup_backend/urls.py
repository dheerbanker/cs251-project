from django.urls import path, include
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('login/', csrf_exempt(views.LoginView.as_view())),
    path('lobby/',csrf_exempt(views.LobbyView.as_view())),
    path('loadgame/',csrf_exempt(views.GamePlay.as_view())),
    path('getgamestate/',csrf_exempt(views.GameState.as_view())),
    path('leaderboard/',csrf_exempt(views.LeaderboardView.as_view())),
]