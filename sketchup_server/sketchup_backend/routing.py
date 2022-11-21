from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"draw/(?P<lobby_code>\w+)/$", consumers.BoardConsumer.as_asgi()),
    re_path(r"chat-connect/(?P<lobby_code>\w+)/(?P<user_name>\w+)$", consumers.ChatConsumer.as_asgi()),
]