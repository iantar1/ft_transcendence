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

# ft_transcendence

A full-stack educational project that bundles a Django backend with real-time (WebSocket) multiplayer games and a static frontend.

This repository contains multiple game apps (Ping-Pong and TicTacToe), a user management system, and optional blockchain tooling for experiments.

## Contents

- backend/: Django project providing REST APIs, authentication, game logic and real-time channels
- frontend/: Static SPA (HTML/JS/CSS) served by nginx in Docker
- PongGame/: Backend/worker for the Ping-Pong game
- TicTacToe/: TicTacToe app and settings
- blockchain/: Hardhat/ethereum tooling (local blockchain for experiments)
- docker-compose.yml: Orchestration for local development
- .env-exmple: Example environment variables (fill and copy to .env)

## Highlights

- Django + Django Channels for WebSocket-based real-time gameplay
- PostgreSQL plugin via Docker for persistent data
- Docker Compose setup to bring up backend, frontend, DB and auxiliary services

## Quick Start — Docker (recommended)

1. Copy environment file and fill in values:

```bash
cp .env-exmple .env
# edit .env and provide secrets (SECRET_KEY, DB_*, OAuth client secrets, etc.)
```

2. Build and start services:

```bash
docker-compose up --build
```

Services defined in docker-compose:

- postgree_db: PostgreSQL (container name: postgree_db)
- backend: Django app (builds from ./backend)
- frontend: Static site (serves files from ./frontend via nginx)
- ponggame: Ping-Pong worker/service
- blockchain: local blockchain (Hardhat) for dev experiments
- tictactoe: TicTacToe service

Note: the Compose file maps the frontend container to host port 3000 (container port 443). Adjust if needed.

## Running Backend Locally (without Docker)

1. Create a virtualenv and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

2. Create `.env` at repo root (copy from `.env-exmple`) and fill values.

3. Run migrations and create a superuser:

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

4. Run the development server (Channels-compatible):

```bash
# you can use the Django development server for basic testing
python manage.py runserver 0.0.0.0:8000

# or run with Daphne for production-like ASGI handling
daphne -b 0.0.0.0 -p 8000 config.asgi:application
```

## Environment variables

This project loads environment variables using python-dotenv and django-environ. Populate these (see `.env-exmple`):

- SECRET_KEY — Django secret key
- DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT — Postgres connection
- EMAIL_BACKEND, EMAIL_HOST, EMAIL_PORT, EMAIL_USE_TLS, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
- CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, OUUTH_TOKEN_URI, FRONTEND_REDIRECT_URL — 42 (intra) OAuth
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGOLE_TOKEN_URI — Google OAuth

Important: current code contains two misspelled variable names: `OUUTH_TOKEN_URI` and `GOOGOLE_TOKEN_URI`. The `.env-exmple` preserves these names to match the code. It's recommended to fix the typos in code and then use corrected names (OAUTH_TOKEN_URI, GOOGLE_TOKEN_URI) — I can help do that if you want.

## Frontend

The `frontend/` folder is a static SPA. The Docker Compose setup builds and serves those files via nginx. There is no dedicated `npm start` script in `frontend/package.json` — the intended flow is to serve the static files using the provided Dockerfile and Compose service.

If you want to develop the frontend locally without Docker, use a simple static server (python's http.server or an npm static server) while pointing API calls to your running backend.

## Project structure (short)

- backend/: Django project (apps: UserManagement, friendSystem, Pong/TicTacToe integrations)
- frontend/: static site (HTML/CSS/JS)
- PongGame/: ping-pong specific service/worker
- TicTacToe/: tic-tac-toe app
- blockchain/: hardhat config and scripts

## Tests

Some apps include `tests.py` files (Django tests). Run them from backend:

```bash
cd backend
python manage.py test
```

## Development notes & troubleshooting

- If migrations fail on startup in Docker, ensure the DB env vars in `.env` are correct and that the Postgres container is healthy.
- Media files are served from `backend/media/` and mapped into the frontend container in Compose — be careful when removing volumes.
- Channels: the default development CHANNEL_LAYERS uses an in-memory backend. For production use Redis and set `channels_redis.core.RedisChannelLayer` with appropriate host.

## Contributing

1. Open an issue to discuss large changes.
2. Create a feature branch from `main`.
3. Add tests for new features and run the test suite.
4. Send a PR with a clear description.

If you'd like, I can:

- Fix the two env-variable typos in code and update `.env-exmple`.
- Add example `.env` for a local dev workflow (non-sensitive placeholder values).
- Add a small script / Makefile targets to run backend migrations automatically in Docker start.

## License

This repository does not include a license file. Add a LICENSE if you plan to publish or share.

---

If you'd like, tell me which parts you want expanded (examples, screenshots, or a CONTRIBUTING.md) and I'll add them.
