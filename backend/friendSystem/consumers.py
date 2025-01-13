from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer



class Notifications(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print('connect', flush=True)


    async def disconnect(self, code):
        print("disconnect")
    
    async def receive(self, text_data=None, bytes_data=None):
        print(f"Message received: {text_data}")
        await self.send()

    async def send(self, text_data=None, bytes_data=None, close=False):
        print("send")
        # text_data = json.dumps("hello from backend")
        text_data = "hello from backend"
        text_data = {"":"", "":"", "":""}
        return super().send(text_data, bytes_data, close)


# Redis is used as a storage layer
# for channel names and group names.
# These are stored within Redis so 
# that they can be accessed from any 
# consumer instance. If for example, I
# create a group called 'users' and then
# add 3 different channel names to it,
# this information is stored in Redis.
# Now, whenever I want to send data to 
# the channels in the group I can simply
# reference the group from my consumer 
# and Django-channels will automatically
# retrieve the channel names stored under
# that group in Redis.