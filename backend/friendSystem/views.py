from django.shortcuts import render
from rest_framework.response import Response
from .models import Friendship, FriendsProfile
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from UserManagement.models import User
import jwt
from rest_framework.exceptions import ValidationError



# Create your views here.


def get_user_by_token(token):
    if not token:
        raise AuthenticationFailed('x1Unauthenticated')
    try:
        playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('xxUnauthenticated')
    
    return User.objects.filter(id=playload['id']).first()

def checkIfTheRelationExsit(user1, user2, action):
    # Check if a friendship exists between the two users in either direction
    if  Friendship.objects.filter(from_user=user1, to_user=user2, status=action).exists():
        return True
    if  Friendship.objects.filter(from_user=user2, to_user=user1, status=action).exists():
        return True
    return False

class FriendShipView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.COOKIES.get('access')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        from_user = get_user_by_token(token)
        if from_user is None:
            raise AuthenticationFailed('Unauthenticated')

        to_user_name = request.data.get('to_user')
        if not to_user_name:
            raise ValidationError({'field error': 'You missed the "to_user" field.'})
        try:
            to_user = User.objects.get(username=to_user_name)
        except:
            raise ValidationError({'error': 'user not found.'})

        if to_user == from_user:
            return Response({"error":"a user can't do this action to himself"})
        action = request.data.get('action')
        

        if checkIfTheRelationExsit(to_user, from_user, action):
            return Response({"error": "This friend request already exists."}, status=400)

        if action == 'sent':
            return self.sendFriendRequest(to_user,from_user)
        elif action == 'accepted':
            return self.acceptFriendRequest(to_user, from_user)
        elif action == 'rejected':
            return self.rejectFriendRequest(to_user, from_user)
        elif action == 'remove':
            return self.removeFriend(to_user, from_user)
        return  Response({"error": "This action doesn't exists."}, status=400)

    def isThisActionExist(sender, receiver, status):
        pass


    def addFriend(self, user, friend):
        userProfile, created = FriendsProfile.objects.get_or_create(user=user)
        friendProfile, created_ = FriendsProfile.objects.get_or_create(user=friend)
        
        # Add the friend to the user's friends list
        userProfile.friends.add(friend)
        friendProfile.friends.add(user)
        userProfile.save()
        friendProfile.save()

    
    def sendFriendRequest(self, to_user,from_user):
        try:
            #get_or_create returns a tuple of two elemnts
            # if to_user == from_user:
            #     return Response({'error': 'a user can\'t be a friend of himself.'}, status=400)
                
            relation, created = Friendship.objects.get_or_create(from_user=from_user, to_user=to_user)
            # relation = Friendship(from_user=from_user, to_user=to_user)
            if created == False:
                relation.status = "sent"
            relation.save()
            return Response({'message': 'Friend request sent successfully.'}, status=200)
        except Exception as e:
            return Response({'error': f'Friend request failed. Error: {str(e)}'}, status=400)


    def rejectFriendRequest(self, to_user, from_user):
        try:
            relation = Friendship.objects.get(from_user=from_user, to_user=to_user)
            if relation.status == 'accepted':
                return Response({'error': "these two users are alredy friendds"}, status=400)
            relation.delete()
            # relation.status = 'rejected'
            # relation.save()

            return Response({'success': "The friendship has been rejected successfully"}, status=200)
        except Friendship.DoesNotExist:
            return Response({"error": "Friendship not found"}, status=404)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=500)


    def acceptFriendRequest(self, to_user, from_user):
        relation = Friendship.objects.get(from_user=from_user, to_user=to_user)
        if relation == None:
            return Response({"error": "friendship not found"}, status=404)
        relation.status = 'accept'
        relation.save()
        self.addFriend(to_user,from_user)

        return Response({'success':"the friendship has been accepted successfully"})

    def removeFriend(self, to_user, from_user):
        # u have to be my friend 
        # delete the both users's friend from their friend profile
        sender_friend_probfile = FriendsProfile.objects.get(user=from_user)
        receiver_friend_probfile = FriendsProfile.objects.get(user=to_user)
        x = sender_friend_probfile.remove_friend(friend=to_user)
        y = receiver_friend_probfile.remove_friend(friend=from_user)
        if x == False or y == False:
            return Response({"error":"you don't have a friend with this name"}, status=400)

        return Response({'success':'the friend has been removed succefull'}, status=200)


def friendRequestHandling(data):
    print("data received: in the view: ", data, flush=True)