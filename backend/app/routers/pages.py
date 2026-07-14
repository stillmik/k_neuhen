from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path


router = APIRouter()
APP_DIR = Path(__file__).resolve().parents[1]
TEMPLATES_DIR = APP_DIR / "templates"
FRONTEND_INDEX = APP_DIR.parent / "frontend" / "index.html"
FRONTEND_ABOUT_US = APP_DIR.parent / "frontend" / "about-us" / "index.html"
FRONTEND_NEW_DROPS = APP_DIR.parent / "frontend" / "new-drops" / "index.html"
FRONTEND_JEWELRY = APP_DIR.parent / "frontend" / "jewelry" / "index.html"


@router.get("/")
async def root():
    return FileResponse(FRONTEND_INDEX)


@router.get("/about-us/")
async def about_us_page():
    return FileResponse(FRONTEND_ABOUT_US)


@router.get("/about-us")
async def about_us_page_no_slash():
    return FileResponse(FRONTEND_ABOUT_US)


@router.get("/new-drops/")
async def new_drops_page():
    return FileResponse(FRONTEND_NEW_DROPS)


@router.get("/new-drops")
async def new_drops_page_no_slash():
    return FileResponse(FRONTEND_NEW_DROPS)


@router.get("/jewelry/")
async def jewelry_page():
    return FileResponse(FRONTEND_JEWELRY)


@router.get("/jewelry")
async def jewelry_page_no_slash():
    return FileResponse(FRONTEND_JEWELRY)


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
