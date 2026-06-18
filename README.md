# K Neuhen

The application consists of a React frontend, a FastAPI backend, and PostgreSQL.

## Run

Development mode with automatic React HMR and FastAPI reload:

```powershell
docker compose -f compose.dev.yml up --build
```

Open <http://localhost:5173>. Changes in `frontend/src` appear automatically.

Production mode:

```powershell
docker compose up --build
```

Open <http://localhost:8000>. Stop and remove containers with:

```powershell
docker compose down
```

## Project structure

```text
.
|-- backend/
|   `-- app/
|       |-- routers/       # HTTP endpoints
|       |-- services/      # Authentication and user logic
|       |-- static/        # CSS and images for backend HTML pages
|       |-- templates/     # Login and registration HTML pages
|       |-- config.py      # Environment configuration
|       |-- database.py    # SQLAlchemy connection and sessions
|       |-- main.py        # FastAPI application setup
|       |-- models.py      # Database models
|       |-- schemas.py     # Request and domain schemas
|       `-- security.py    # Password hashing and verification
|-- frontend/
|   |-- src/
|   |   |-- components/    # Reusable React components
|   |   |-- App.jsx        # Page composition and hex settings
|   |   |-- index.css      # Global and hex background styles
|   |   `-- main.jsx       # React entry point
|   |-- index.html         # Vite HTML entry point
|   |-- package.json       # Frontend scripts and dependencies
|   `-- vite.config.js     # Frontend build configuration
|-- Dockerfile             # Multi-stage frontend/backend image
|-- compose.dev.yml        # Development containers with live reload
|-- docker-compose.yml     # Application and PostgreSQL services
`-- requirements.txt       # Python dependencies
```

The frontend build output and installed packages are generated directories and
must not be committed. Docker builds them inside the image.
