from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('lobby/', views.LobbyView.as_view()),
]