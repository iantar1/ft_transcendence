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
        response.set_cookie(key="access", value=access_token, httponly=True)
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
            raise AuthenticationFailed('Unauthenticated')
        try:
            playload = jwt.decode(otp_token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
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
        response.set_cookie(key="access", value=access_token, httponly=True)
        response.set_cookie(key="refresh", value=refresh_token, httponly=True)
        response.data = {
            "access": access_token,
            "refresh": refresh_token
        }

        return response


class UserView(APIView):
    
    def get(self, request):
        token = request.COOKIES.get('access')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=playload['id']).first()
        serailiser = UserSerializer(user)
        return Response(serailiser.data)
    
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
        raise AuthenticationFailed('Unauthenticated')
    
    try:
        playload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    
    return User.objects.filter(id=playload['id']).first()
    
# {
# "crrent_password":"test",
# "new_password1":"test1",
# "new_password2":"test1"
# }



class MatchHistoryView(APIView):
    def get(self, request):
        token = request.COOKIES.get('access')
        user = get_user_by_token(token)
        if user == None:
            raise AuthenticationFailed('Unauthenticated')
        match_history = MatchHistory.objects.filter(user1=user.id) | MatchHistory.objects.filter(user2=user.id)
        match_history_list = MatchHistorySerializer(match_history, many=True).data

        return Response({"matchHistory": match_history_list})

    def post(self, request):
        token = request.COOKIES.get('access')
        user = get_user_by_token(token)
        if user == None:
            raise AuthenticationFailed('Unauthenticated')
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
        serialer = StatsSerializer(user.stats)
        return Response(serialer.data, status=200)

def checkIfTheRelationExsit(user1, user2, action):
    # Check if a friendship exists between the two users in either direction
    if  Friendship.objects.filter(from_user=user1, to_user=user2, status=action).exists():
        return True
    if  Friendship.objects.filter(from_user=user2, to_user=user1, status=action).exists():
        return True
    return False


# from rest_framework.permissions import IsAuthenticated

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

        action = request.data.get('action')

        if checkIfTheRelationExsit(to_user, from_user, action):
            return Response({"error": "This friend request already exists."}, status=400)

        if action == 'sent':
            return self.sendFriendRequest(to_user,from_user)
        elif action == 'accepted':
            return self.acceptFriendRequest(to_user, from_user)
        elif action == 'rejected':
            return self.rejectFriendRequest(to_user, from_user)
        return  Response({"error": "This action doesn't exists."}, status=400)



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
            relation = Friendship(from_user=from_user, to_user=to_user)
            relation.save()
            return Response({'message': 'Friend request sent successfully.'}, status=200)
        except Exception as e:
            return Response({'error': f'Friend request failed. Error: {str(e)}'}, status=400)


    def rejectFriendRequest(self, to_user,from_user):
        relation = Friendship.objects.get(from_user=from_user, to_user=to_user)
        if relation == None:
            return Response({"error": "friendship not found"}, status=404)
        
        relation.status = 'rejected'
        relation.save()
        return Response({'success':"the friendship has been rejected successfully"})

    def acceptFriendRequest(self, to_user, from_user):
        relation = Friendship.objects.get(from_user=from_user, to_user=to_user)
        if relation == None:
            return Response({"error": "friendship not found"}, status=404)
        relation.status = 'accept'
        relation.save()
        self.addFriend(to_user,from_user)
        # try:
        # except:
        #     return Response({"error":"the Profile friendship does not exist"}, status=404)
        return Response({'success':"the friendship has been accepted successfully"})



# send request
# receive request
# 