import os
import time

import pytest
from channels.testing import WebsocketCommunicator
from channels.testing import HttpCommunicator
from channels.routing import URLRouter

from sketchup_server.asgi import application

from sketchup_backend.consumers import BoardConsumer
from sketchup_backend.routing import websocket_urlpatterns

@pytest.mark.asyncio
async def test_chatConsumerChannel():
    communicator_one = WebsocketCommunicator(URLRouter(websocket_urlpatterns), "/chat-connect/dumlobby/bullshitBobby")
    communicator_two = WebsocketCommunicator(URLRouter(websocket_urlpatterns), "/chat-connect/dumlobby/crappishRon")

    connected, _ = await communicator_one.connect()
    assert connected
    connected, _ = await communicator_two.connect()
    assert connected

    await communicator_one.send_to(text_data = "Test message from bullshitBobby")
    response = await communicator_two.receive_from()

    assert response == "{'sender':'bullshitBobby', 'message': 'crappishRon'}"

@pytest.mark.asyncio
async def test_boardConsumerChannel():
    communicator_one = WebsocketCommunicator(URLRouter(websocket_urlpatterns), "/draw/dumlobby/")
    communicator_two = WebsocketCommunicator(URLRouter(websocket_urlpatterns), "/draw/dumlobby/")

    connected, _ = await communicator_one.connect()
    assert connected
    connected, _ = await communicator_two.connect()
    assert connected

    await communicator_one.send_to(text_data = "test_data")
    response = await communicator_two.receive_from()

    assert response == "test_data"

def test_dummy():
    x=5
    y=5
    assert x+y==10, "sum should be 10"
    assert x+y!=11, "sum shouldn't be 11"