from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from pathlib import Path

from app.python.config import SESSION_SECRET_KEY
from app.python.routers.auth import router as auth_router
from app.python.routers.pages import router as pages_router
from database import engine
from models import Base


BASE_DIR = Path(__file__).resolve().parents[2]
STATIC_DIR = BASE_DIR / "resources" / "static"


# Create all database tables defined in SQLAlchemy models.
# During development this is enough.
# In production, Alembic migrations should be used instead.
# <<<DEVELOPMENT_ONLY>>>
Base.metadata.create_all(bind=engine)

# Main FastAPI application instance.
app = FastAPI()


app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET_KEY)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.include_router(pages_router)
app.include_router(auth_router)
