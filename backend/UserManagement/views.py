from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import *
import jwt, datetime
from .utils import *
from rest_framework import status
from rest_framework.exceptions import ValidationError

# Create your views here.


class RegesterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        access_token = create_access_token(user_data.get('id'))
        refresh_token = create_refresh_token(user_data.get('id'))

        response = Response()
        response.set_cookie(key="access", value=access_token, httponly=False)
        response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        response.data = {
            "access": access_token,
            "refresh": refresh_token,
            **serializer.data
        }
        return response
        # return Response(serializer.data)
    

import random
from datetime import timedelta
from django.core.mail import send_mail
from django.utils import timezone

class LoginView(APIView):
    
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
    
        user = User.objects.filter(username=username).first()
        
        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("incorrect password")

         # Generate OTP
        otp_token = create_access_token(user.id)
        otp = str(random.randint(100000, 999999))
        user.otp = otp
        user.otp_expiry_time = timezone.now() + timedelta(minutes=5)  # OTP expires in 5 minutes
        user.save()

        # Store user ID in session
        response = Response()
        # request.session['otp_user_id'] = user.id
        response.set_cookie(key="otp_token", value=otp_token, httponly=True)

        send_mail(
            'Your OTP Code',
            f'Your OTP code is: {otp}',
            'antartalha@gmail.com',  # Replace with your sender email
            [user.email],  # Send to the user's email
            fail_silently=False,
        )
        response.data = {"message": "OTP sent to your email. Please enter the OTP to continue."}
        return response


class VerifyOTPView(APIView):

    def post(self, request):
        otp = request.data['otp']

        otp_token = request.COOKIES.get('otp_token')
    
        if not otp_token:
            raise AuthenticationFailed('22Unauthenticated')
        try:
            playload = jwt.decode(otp_token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('33Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
    
        if user is None:
            raise AuthenticationFailed("user not found")
        if user.otp != otp or timezone.now() > user.otp_expiry_time:
            raise AuthenticationFailed("Invalid or expired OTP")

        # Generate tokens
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        response.delete_cookie('otp_token')
        response.set_cookie(key="access", value=access_token, httponly=False)
        response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        response.data = {
            "access": access_token,
            "refresh": refresh_token
        }

        return response

def checkAuthenticationAnsReturnTokens(request):
    access_token = request.COOKIES.get('access')
    refresh_token = request.COOKIES.get('refresh')
    
    if not access_token or not refresh_token:
        raise AuthenticationFailed('44Unauthenticated')
    return {access_token, refresh_token}

def generateNewTokens(response, access_token, refresh_token, playload):
    user = User.objects.filter(id=playload['id']).first()
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)
    response.set_cookie(key="access", value=access_token, httponly=False)
    response.set_cookie(key="refresh", value=refresh_token, httponly=True)


class UserView(APIView):
    
    def get(self, request):
        # access_token = request.COOKIES.get('access')
        # refresh_token = request.COOKIES.get('refresh')
        
        # if not access_token:
        #     raise AuthenticationFailed('Unauthenticated')
        access_token, refresh_token = checkAuthenticationAnsReturnTokens(request)
        response = Response()
        try:
            playload = jwt.decode(access_token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            try:
                playload = jwt.decode(refresh_token, 'refresh_secret', algorithms=['HS256'])
                generateNewTokens(response, access_token, refresh_token, playload)
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
        serailiser = UserSerializer(user)
        response.data = serailiser.data
        return response
    
    def delete(self, request):
        token = request.COOKIES.get('access')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

    # should the user enter its password before deleting his account 
        if user:
            user.delete()
            return Response({"detail": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        
        raise AuthenticationFailed('User not found')
    
    
class LogoutView(APIView):
    
    def post(self, request):
        response = Response()
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {
            'message':'the user is successfuly logout'
        }
        return response


class UpdateView(APIView):
    
    def post(self, request):
        token = request.COOKIES.get('access')
    
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
    #check password and update it (password) (new password)
        
        user = User.objects.filter(id=playload['id']).first()
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ChangePasswordView(APIView):
    
    def post(self, request):
        token = request.COOKIES.get('access')
    
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
        crrent_password = request.data['crrent_password']
        new_password1 = request.data['new_password1']
        new_password2 = request.data['new_password2']
        if not user.check_password(crrent_password):
            raise AuthenticationFailed("incorrect password")
        if new_password1 != new_password2:
            return Response("Password1 is different from Password2", status=400)
        print(f'crrent: {crrent_password}')
        print(f'new: {new_password1}')
        user.set_password(new_password1)
        return Response({"seccess":"the password changed successfuly"}, status=200)


class ChangeBioImage(APIView):

    def post(self, request):
        token = request.COOKIES.get('access')
    
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
        serializer = ImageBioSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


def get_user_by_token(token):
    if not token:
        raise AuthenticationFailed('x1Unauthenticated')
    try:
        playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('xxUnauthenticated')
    
    return User.objects.filter(id=playload['id']).first()
    
# {
# "crrent_password":"test",
# "new_password1":"test1",
# "new_password2":"test1"
# }



class MatchHistoryView(APIView):
    def get(self, request):
        # print(f"TOKEN : not found")
        token = request.COOKIES.get('access')
        user = get_user_by_token(token)
        if user == None:
            raise AuthenticationFailed('11Unauthenticated')
        match_history = MatchHistory.objects.filter(user1=user.id) | MatchHistory.objects.filter(user2=user.id)
        match_history_list = MatchHistorySerializer(match_history, many=True).data
        print({"matchHistory": match_history_list})
        return Response({"matchHistory": match_history_list})

    def post(self, request):
        print(request)
        token = request.COOKIES.get('access')
        user = get_user_by_token(token)
        if user == None:
            raise AuthenticationFailed('00Unauthenticated')
        #opponenet username
        try:
            opponent_username = request.data['opponent_username']
            opponent_score = request.data['opponent_score']
            user_score = request.data['user_score']

        except:
            raise ValidationError({'field error': 'you missed some fields'})
        user2 = User.objects.filter(username=opponent_username).first()

        if user2 is None:
            raise ValidationError({'username error': 'This username does not exist'})

        if user_score > opponent_score:
            winner = user
            user.stats.wins += 1
        else:
            winner = user2
            user.stats.losses += 1
        user.stats.save()
        # Save the match history
        history = MatchHistory(
            user1=user,
            user2=user2,
            user1_score=user_score,
            user2_score=opponent_score,
            winner=winner
        )
        history.save()
        user.score += user_score
        user.save()
        return Response("The match history stored successfully", status=200)


class StatsView(APIView):
     
    def get(self, request):
        token = request.COOKIES.get('access')
        user = get_user_by_token(token)
        if user == None:
            raise AuthenticationFailed('Unauthenticated')
        stats = Stats.objects.get(user=user)
        if stats == None:
            return Response({"error":"stats not found"}, status=404)
        serialer = StatsSerializer(stats)
        # print(serialer.data)
        print("----------------------------")
        # print(stats)
        return Response(serialer.data, status=200)

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



# send a freind request
# cancel it/from the sender and the rescever 
# if a user resceive a frined request he can't send it to the same user
# sender -> receiver
# if a frind request canceled remove it from the data base
#
#the friend system :
# url: /friend_ship/
#POST :
# {
# "from_user":"sende username",
# "to_user":"receiver username",
# "status":"",
# "action":"sent rejected accepted remove"
# }
