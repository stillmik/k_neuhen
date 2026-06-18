from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

from app.config import SESSION_SECRET_KEY
from app.database import engine
from app.models import Base
from app.routers.auth import router as auth_router
from app.routers.pages import router as pages_router


APP_DIR = Path(__file__).resolve().parent
STATIC_DIR = APP_DIR / "static"
FRONTEND_DIR = APP_DIR.parent / "frontend"


# Create all database tables defined in SQLAlchemy models.
# During development this is enough.
# In production, Alembic migrations should be used instead.
# <<<DEVELOPMENT_ONLY>>>
Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET_KEY)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
if (FRONTEND_DIR / "assets").is_dir():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIR / "assets"), name="frontend-assets")
app.include_router(pages_router)
app.include_router(auth_router)
