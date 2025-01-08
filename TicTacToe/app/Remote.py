import json
import random
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

player_queue = []

class RemoteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        player_queue.append(self)
        self.gameActive = True
        self.currentPlayer = None
        self.board = []
        self.game_room = f"room_{random.randint(1, 999)}"
        await self.channel_layer.group_add(self.game_room, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        self.gameActive = False
        if self in player_queue:
            player_queue.remove(self)
        await self.channel_layer.group_discard(self.game_room, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        if(player_queue >= 2):
            pass