import os

from dotenv import load_dotenv


load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY", os.getenv("SECRET_KEY", "change-me"))