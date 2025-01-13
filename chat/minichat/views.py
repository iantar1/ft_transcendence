from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, "minichat/index.html")

def room(request, room_name):
    return render(request, "minichat/room.html", {"room_name": room_name})

