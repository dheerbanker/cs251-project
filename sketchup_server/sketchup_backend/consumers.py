import asyncio
import json
from channels.consumer import AsyncConsumer

class BoardConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        self.room_name = self.scope["url_route"]["kwargs"]["lobby_code"] + "_board"

        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.send({
            "type": "websocket.accept"
        })
        
    async def websocket_receive(self, event):
        drawing_data = event.get('text', None)
        await self.channel_layer.group_send(self.room_name,{
                "type": "draw.data",
                "text": drawing_data,
        })
    
    async def draw_data(self, event):
        await self.send({
            "type": "websocket.send",
            "text": event['text'],
        })

    async def websocket_disconnect(self, event):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)
        super().websocket_disconnect(event)

class ChatConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        self.room_name = self.scope["url_route"]["kwargs"]["lobby_code"] + "_chat"
        self.user_name = self.scope["url_route"]["kwargs"]["user_name"]
        
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.send({
            "type": "websocket.accept"
        })

    async def websocket_receive(self, event):
        message = event.get("text", None)

        if message is None:
            return

        await self.channel_layer.group_send(self.room_name, {
            "type": "chat.data",
            "username": self.user_name,
            "message": message
        })

    async def chat_data(self, event):
        await self.send({
            "type": "websocket.send",
            "text": json.dumps({
                "username": event["username"],
                "message": event["message"],
                })
        })

    async def websocket_disconnect(self, event):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)
        # super().websocket_disconnect(event)