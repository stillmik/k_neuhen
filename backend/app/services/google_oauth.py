from app.config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI


oauth = None
google_ready = False

try:
    from authlib.integrations.starlette_client import OAuth

    oauth = OAuth()
    oauth.register(name="google", client_id=GOOGLE_CLIENT_ID, client_secret=GOOGLE_CLIENT_SECRET, server_metadata_url="https://accounts.google.com/.well-known/openid-configuration", client_kwargs={"scope": "openid email profile"}, redirect_uri=GOOGLE_REDIRECT_URI)
    google_ready = bool(GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
except ImportError:
    oauth = None
    google_ready = False
