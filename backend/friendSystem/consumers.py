from channels.generic.websocket import WebsocketConsumer
import json
from UserManagement.views import friendRequestHandling
from UserManagement.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt

user_channels = {}

def get_user_by_token(token):
    if not token:
        raise AuthenticationFailed('x1Unauthenticated')
    try:
        playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('xxUnauthenticated')
    
    return User.objects.filter(id=playload['id']).first()


class   Notifications(WebsocketConsumer):
    def getUserUsername(self, access, refresh):
        user = get_user_by_token(access)
        print("user: ", user, flush=True)


    def connect(self):
        self.accept()
        print("scope: ", self.scope, flush=True)
        print(f"channel_name: {self.channel_name}", flush=True)
        print('connect')
        cookies = self.scope.get("cookies", {})
        access_token = cookies.get("access")  # Replace 'access' with the actual cookie name
        refresh_token = cookies.get("refresh") 
        
        self.getUserUsername(access_token, refresh_token)


    def disconnect(self, code):
        print("disconnect")
    
    def receive(self, text_data=None, bytes_data=None):
        print(f"Message received (raw): {text_data}", flush=True)
        if text_data:
            try:
                data = json.loads(text_data)
                print(f"Parsed message: {data}", flush=True)
            except json.JSONDecodeError as e:
                print(f"Failed to decode JSON: {e}")
        self.send_notif(data)
        friendRequestHandling(data)

    def send_notif(self, data):
        print("send_notif called")
        notification_data = {
            "from_user": "iantar",
            "to_user": "kali",
            "status": "",
            "action": "accepted"
        }
        print(f"Sending notification: {data}")

        self.send(text_data=json.dumps(data))


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