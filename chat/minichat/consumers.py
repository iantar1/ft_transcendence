import json

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print('connect')
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        print('disconnect')
        pass

    def receive(self, text_data):
        print('receive')

        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {
                "type": "chat_message",
                "message": message
            }
        )
        # self.send(text_data=json.dumps({"message": message}))

    def chat_message(self, event):
        print('chat_message')
        message = event["message"]
        self.send(text_data=json.dumps(
            {
                'type': "chat_message",
                "message": message
            }))