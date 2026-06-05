from sqlalchemy.orm import Session
from auth import hash_password
from models import SiteUser
from schemas import NewSiteUser


import re


def _normalize_text(value: str) -> str:
    return value.strip()



def _normalize_phone(value: str) -> str:
    return value.replace(" ", "").strip()



def validate_user_payload(db: Session, payload: NewSiteUser) -> dict[str, str]:
    errors: dict[str, str] = {}

    first_name = _normalize_text(payload.first_name)
    last_name = _normalize_text(payload.last_name)
    email = _normalize_text(str(payload.email))
    phone = _normalize_phone(payload.phone)
    password = _normalize_text(payload.password)

    if not first_name:
        errors["first_name"] = "First name is required"

    if not last_name:
        errors["last_name"] = "Last name is required"

    if not email:
        errors["email"] = "Email is required"
    elif db.query(SiteUser).filter(SiteUser.email == email).first():
        errors["email"] = "Email already exists"
    elif not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
        errors["email"] = "Invalid email address"

    if not phone:
        errors["phone"] = "Phone is required"
    elif db.query(SiteUser).filter(SiteUser.phone == phone).first():
        errors["phone"] = "Phone already exists"
    elif not re.match(r"^\+?[0-9]{9,15}$", phone):
        errors["phone"] = "Invalid phone number"

    if not password:
        errors["password"] = "Password is required"
    elif len(password) < 8:
        errors["password"] = "Minimum 8 characters"
    elif not re.search(r"[A-Z]", password):
        errors["password"] = "Must contain uppercase letter"
    elif not re.search(r"[a-z]", password):
        errors["password"] = "Must contain lowercase letter"
    elif not re.search(r"[0-9]", password):
        errors["password"] = "Must contain number"

    return errors



def create_user(db: Session, payload: NewSiteUser) -> SiteUser:
    user = SiteUser(first_name=payload.first_name.strip(), last_name=payload.last_name.strip(), email=str(payload.email).strip(), phone=payload.phone.replace(" ", "").strip(), hashed_password=hash_password(payload.password.strip()))

    db.add(user)
    db.commit()
    db.refresh(user)
    return user
