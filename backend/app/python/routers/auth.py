from fastapi import APIRouter, Form, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.python.services.google_oauth import google_ready, oauth
from app.python.services.users import (
    authenticate_local_user,
    create_local_user,
    get_or_create_google_user,
    validate_registration,
)
from database import SessionLocal
from schemas import NewSiteUser


router = APIRouter(prefix="")


def _close_db(db: Session) -> None:
    db.close()


@router.post("/register")
async def register_user(
    first_name: str = Form(""),
    last_name: str = Form(""),
    email: str = Form(""),
    phone: str = Form(""),
    password: str = Form(""),
):
    db: Session = SessionLocal()
    payload = NewSiteUser(first_name=first_name, last_name=last_name, email=email, phone=phone, password=password)

    try:
        errors = validate_registration(db, payload)
        if errors:
            return {"errors": errors}

        user = create_local_user(db, payload)
        return {
            "message": "User created successfully",
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
            },
        }
    except Exception:
        db.rollback()
        return {"errors": {"form": "Could not create user right now"}}
    finally:
        _close_db(db)


@router.post("/login")
async def login_user(email: str = Form(""), password: str = Form("")):
    db: Session = SessionLocal()
    try:
        user, errors = authenticate_local_user(db, email, password)
        if errors:
            return {"errors": errors}
        return {
            "message": "Signed in successfully",
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
            },
        }
    except Exception:
        db.rollback()
        return {"errors": {"form": "Could not sign you in right now"}}
    finally:
        _close_db(db)


@router.get("/auth/google")
async def google_login(request: Request):
    if not google_ready or oauth is None:
        return RedirectResponse(url="/login?error=google_not_configured", status_code=302)
    return await oauth.google.authorize_redirect(request, request.url_for("google_callback"))


@router.get("/auth/google/callback")
async def google_callback(request: Request):
    db: Session = SessionLocal()
    try:
        token = await oauth.google.authorize_access_token(request)
        profile = token.get("userinfo")
        if not profile:
            profile = await oauth.google.parse_id_token(request, token)

        email = profile.get("email", "").strip()
        if not email:
            return RedirectResponse(url="/login?error=google_email_missing", status_code=302)

        full_name = profile.get("name", "") or ""
        name_parts = full_name.split(" ", 1) if full_name else [""]
        first_name = profile.get("given_name", "") or name_parts[0]
        last_name = profile.get("family_name", "")
        if not last_name and len(name_parts) > 1:
            last_name = name_parts[1]

        user = get_or_create_google_user(db, first_name, last_name, email)
        request.session["user"] = {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        return RedirectResponse(url="/login-success", status_code=302)
    except Exception:
        db.rollback()
        return RedirectResponse(url="/login?error=google_auth_failed", status_code=302)
    finally:
        _close_db(db)
