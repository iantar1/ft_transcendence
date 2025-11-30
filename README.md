
# ft_transcendence

> A dynamic full‑stack web project featuring online games (Pong, TicTacToe …), real‑time chat, and user management — this repo contains backend, frontend, game logic and more.  
> Backend is developed using Python / Django (with real‑time support via WebSockets/Channels).  

## 🎯 Project Overview

**ft_transcendence** is a web platform where users can:

- Play classic games (e.g. Pong, TicTacToe) online in real time.  
- Use chat functionality (private / group / global) to communicate.  
- Manage user accounts, profiles, friend lists, online status, etc.  
- Enjoy a responsive single-page application (SPA) frontend + robust backend + real-time communication.  

This project represents the culmination of the first part of my curriculum journey.  

## 📂 Repo Structure (backend‑focused)




*(Adjust paths/names above to your actual layout if needed.)*

## ⚙️ Backend Stack & Technologies

- **Language & Framework**: Python + Django (with REST API and WebSockets / real-time support)  
- **Database**: (e.g. PostgreSQL, SQLite — whichever you configured)  
- **Real‑time / WebSockets**: for real-time game events, chat, status updates, etc.  
- **Containerization**: via Docker + docker-compose → easy deployment / development environment setup  
- **Optional / Configurable Features** (depending on your setup): authentication, user profiles, game history, matchmaking, friend system, chat, etc.  

## ✅ What’s Implemented (Backend Responsibilities)

- User authentication & session management  
- API endpoints for user data, game data, chat, friend lists, etc.  
- WebSocket / real-time communication for games and chat  
- Game logic backend support (matchmaking, game sessions, state synchronization)  
- Integration with containerization (Docker) for easy deployment / local dev  
- Data persistence: users, games, chat history, stats  

## 🚀 How to Run (Backend + Full Project)

1. Clone the repository  
    ```bash
    git clone https://github.com/iantar1/ft_transcendence.git
    cd ft_transcendence
    ```  
2. Build and start services (backend, frontend, DB, etc.) with Docker:  
    ```bash
    docker-compose up --build
    ```  
3. Access the application via your browser (usually at `http://localhost:…`) — frontend handles UI, backend provides API + WebSockets.  

> **Note**: Ensure you have Docker (and docker-compose) installed before running.  

## 🧪 Development & Contributing

- For backend changes, start by editing/adding Django apps in `/backend`.  
- For real-time features (games, chat), ensure both backend (WebSocket) and frontend (JS) parts are updated accordingly.  
- Use Docker during development to maintain consistent environment across machines.  
- If adding new features (e.g. new games, statistics, friend system), follow existing project structure and REST/WebSocket conventions.  

## ⚠️ Known / Future Improvements (or To‑Do Ideas)

- Add user profile pages (avatars, stats, match history)  
- Improve game matchmaking (automatic pairing, tournament support)  
- Better game state persistence & history (leaderboards, replays)  
- Security hardening (authentication, validation, rate‑limiting)  
- Add more games / extend game logic modules  
- Optimize real-time performance (especially under many concurrent users)  

## 📄 License & Credits

This project was developed as part of a programming curriculum. Feel free to use or adapt — but please keep attribution where relevant.  

---

Hope this README helps — you can expand it with more details (e.g. environment variables, backend settings, deployment steps). If you like, I can also generate a **French** or **bilingual (EN + FR)** version for you.  
