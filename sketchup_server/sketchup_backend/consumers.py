import asyncio
import json
from channels.consumer import AsyncConsumer

class BoardConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print('connected', event)
        self.board_room = 'boardroom'
        await self.channel_layer.group_add(
            self.board_room,
            self.channel_name
        )
        await self.send({
            "type": "websocket.accept"
        })
        
    async def websocket_receive(self, event):
        drawing_data = event.get('text', None)
        await self.channel_layer.group_send(
            self.board_room,
            {
                "type": "board_data",
                "text": drawing_data,
            }
        )
    
    async def board_data(self, event):
        await self.send({
            "type": "websocket.send",
            "text": event['text'],
        })

    async def websocket_disconnect(self, event):
        print("disconnected.", event)

class ChatConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        pass

    async def websocket_receive(self, event):
        pass

    async def chat_data(self, event):
        pass

    async def websocket_disconnect(self, event):
        pass