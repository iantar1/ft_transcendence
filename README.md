# ft_transcendence

A full-stack web project featuring online multiplayer games (Ping-Pong, TicTacToe) and user management.  
This repository is part of an educational project combining backend, frontend, game logic, and real-time communication.

---

## 🏗 Project Overview

**ft_transcendence** allows users to:

- Play classic games online in real time (Ping-Pong, TicTacToe)
- Manage accounts, profiles, friends, and game statistics
- Experience real-time updates for games thanks to WebSockets

The project is divided into multiple components:

- **Backend:** Handles authentication, user management, game logic and real-time communication
- **Frontend:** SPA built with JavaScript/HTML/CSS for the user interface
- **Games:** Individual modules for Ping-Pong and TicTacToe
- **Docker:** Containerization for easy deployment and consistent development

---

## 📂 Repository Structure
````bash
ft_transcendence/
├── backend/ ← Django backend
│ ├── apps/ ← Auth, Users, Games
│ ├── manage.py
│ ├── requirements.txt
│ ├── Dockerfile
│ └── settings.py
├── frontend/ ← SPA frontend (JS/HTML/CSS)
├── PongGame/ ← Ping-Pong game logic & integration
├── TicTacToe/ ← TicTacToe game logic
├── blockchain/ ← Optional blockchain features
├── docker-compose.yml ← Docker orchestration for backend, frontend, DB
└── README.md
````


---

## ⚙️ Tech Stack

### Backend

- Python + Django (REST API & WebSocket support via Django Channels)
- PostgreSQL or SQLite
- JWT/session-based authentication
- Docker containerization

### Frontend

- Single Page Application (SPA) with JavaScript, HTML, and CSS
- Integrates with backend APIs and WebSocket endpoints for real-time updates

### Games

- Ping-Pong: server-synced real-time gameplay
- TicTacToe: turn-based game logic with live updates
- Matchmaking handled by backend

---

## ✅ Features

### Backend (Your Part)

- User authentication & profile management
- REST API endpoints for frontend consumption
- Real-time game session management
- Matchmaking system for multiplayer games
- WebSocket support live gameplay
- Docker-ready for development and deployment

### Frontend

- Responsive SPA for interacting with backend APIs
- Game interface for Ping-Pong and TicTacToe

### Games

- Game state synchronization and persistence
- Real-time multiplayer support

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Docker & Docker Compose

### Run Locally

1. Clone the repo:

```bash
git clone https://github.com/iantar1/ft_transcendence.git
cd ft_transcendence

docker-compose up --build
```
