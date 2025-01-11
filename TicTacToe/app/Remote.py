import json
import random
import asyncio
import httpx
from channels.generic.websocket import AsyncWebsocketConsumer

player_queue = []
active_games = {}
BACKEND_URL = "http://backend:8000/user/"


class RemoteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.currentPlayer = None
        self.game_room = None
        self.opponent = None
        self.username = None
        self.cookies = self.scope.get("cookies", {})

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(BACKEND_URL, cookies=self.cookies, timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    self.username = data.get("username")
                    print("get user data")
                else:
                    print(f"Failed to get user data: {response.status_code} - {response.text}")
            except httpx.RequestError as e:
                print(f"Error get user data: {e}")

        player_queue.append(self)
        await self.accept()
        
        # If we have two players, start a game
        if len(player_queue) >= 2:
            player1 = player_queue.pop(0)
            player2 = player_queue.pop(0)
            
            # Create a game room
            game_room = f"room_{random.randint(1, 999999)}"
            
            # Set up players
            player1.game_room = game_room
            player2.game_room = game_room
            player1.opponent = player2
            player2.opponent = player1
            player1.currentPlayer = 'X'
            player2.currentPlayer = 'O'
            
            # Add players to the game room group
            await self.channel_layer.group_add(game_room, player1.channel_name)
            await self.channel_layer.group_add(game_room, player2.channel_name)
            
            # Store game state
            active_games[game_room] = {
                'board': [''] * 9,
                'current_turn': 'X',
                'players': [player1, player2]
            }
            
            # Send initial game state to both players
            for player in [player1, player2]:
                await player.send(json.dumps({
                    'type': 'start',
                    'role': player.currentPlayer,
                    'board': active_games[game_room]['board'],
                    'currentPlayer': 'X',
                    'opp_username': player.opponent.username
                }))

    async def disconnect(self, close_code):
        if self in player_queue:
            player_queue.remove(self)
        
        if self.game_room:
            if self.game_room in active_games:
                del active_games[self.game_room]
            await self.channel_layer.group_discard(self.game_room, self.channel_name)
            
            # Notify opponent about disconnection if they exist
            if self.opponent:
                player_queue.append(self.opponent)
                self.opponent.currentPlayer = None
                self.opponent.game_room = None
                self.opponent.opponent = None
                await self.opponent.send(json.dumps({
                    'type': 'opponent_disconnected',
                    'message': 'Opponent disconnected'
                }))

    async def receive(self, text_data):
        if not self.game_room or self.game_room not in active_games:
            return
            
        data = json.loads(text_data)
        game = active_games[self.game_room]

            # Handle reset request
        if data.get('type') == 'reset':
            if self.game_room and self.game_room in active_games:
                # Reset the game state
                active_games[self.game_room]['board'] = [''] * 9
                active_games[self.game_room]['current_turn'] = 'X'
                
            # Send initial game state to both players
            for player in game['players']:
                await player.send(json.dumps({
                    'type': 'start',
                    'role': player.currentPlayer,
                    'board': active_games[self.game_room]['board'],
                    'currentPlayer': 'X',
                    'opp_username': player.opponent.username
                }))
            return
        
        # Verify it's the player's turn
        if game['current_turn'] != self.currentPlayer:
            return
            
        if 'index' in data:
            index = int(data['index'])
            
            # Verify move is valid
            if 0 <= index < 9 and game['board'][index] == '':
                # Update board
                game['board'][index] = self.currentPlayer
                
                # Check for win
                winner = self.check_winner(game['board'])
                is_draw = all(cell != '' for cell in game['board'])
                
                # Prepare update message
                message = {
                    'type': 'game_update',
                    'board': game['board'],
                    'position': index,
                    'currentPlayer': 'O' if self.currentPlayer == 'X' else 'X'
                }
                
                if winner:
                    message['winner'] = winner
                    message['type'] = 'game_over'
                elif is_draw:
                    message['type'] = 'game_over'
                    message['draw'] = True
                else:
                    # Switch turns
                    game['current_turn'] = 'O' if self.currentPlayer == 'X' else 'X'
                
                # Broadcast update to both players
                await self.channel_layer.group_send(
                    self.game_room,
                    {
                        'type': 'broadcast_game_state',
                        'message': message
                    }
                )

    async def broadcast_game_state(self, event):
        await self.send(json.dumps(event['message']))

    def check_winner(self, board):
        # Winning combinations
        lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
            [0, 4, 8], [2, 4, 6]  # Diagonals
        ]
        
        for line in lines:
            if (board[line[0]] != '' and
                board[line[0]] == board[line[1]] and
                board[line[0]] == board[line[2]]):
                return board[line[0]]
        return None