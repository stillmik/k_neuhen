from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path


router = APIRouter()
PAGES_DIR = Path(__file__).resolve().parents[3] / "resources" / "html"


@router.get("/")
async def root():
    return FileResponse(PAGES_DIR / "main_page.html")


@router.get("/register")
async def register_page():
    return FileResponse(PAGES_DIR / "register.html")


@router.get("/success")
async def success_page():
    return FileResponse(PAGES_DIR / "success.html")


@router.get("/login")
async def login_page():
    return FileResponse(PAGES_DIR / "login.html")


@router.get("/login-success")
async def login_success_page():
    return FileResponse(PAGES_DIR / "login-success.html")
