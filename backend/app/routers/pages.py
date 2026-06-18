from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path


router = APIRouter()
APP_DIR = Path(__file__).resolve().parents[1]
TEMPLATES_DIR = APP_DIR / "templates"
FRONTEND_INDEX = APP_DIR.parent / "frontend" / "index.html"


@router.get("/")
async def root():
    return FileResponse(FRONTEND_INDEX)


@router.get("/register")
async def register_page():
    return FileResponse(TEMPLATES_DIR / "register.html")


@router.get("/success")
async def success_page():
    return FileResponse(TEMPLATES_DIR / "success.html")


@router.get("/login")
async def login_page():
    return FileResponse(TEMPLATES_DIR / "login.html")


@router.get("/login-success")
async def login_success_page():
    return FileResponse(TEMPLATES_DIR / "login-success.html")
