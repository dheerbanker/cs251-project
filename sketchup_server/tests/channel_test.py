import os

import pytest
from channels.testing import WebsocketCommunicator
from channels.testing import HttpCommunicator
from sketchup_server.asgi import application

from sketchup_backend.consumers import BoardConsumer

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sketchup_server.settings")

@pytest.mark.asyncio
async def test_boardConsumerChannel():
    communicator_one = WebsocketCommunicator(BoardConsumer.as_asgi(), "/board-comm/")
    communicator_two = WebsocketCommunicator(BoardConsumer.as_asgi(), "/board-comm/")

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