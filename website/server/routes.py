"""Routes for the application."""

import os
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException
from starlette.requests import Request
from starlette.responses import Response, RedirectResponse
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
import jwt

router = APIRouter()

# config google oauth
config = Config(".env")
oauth = OAuth(config)
oauth.register(
    name="google",
    server_metadata_url=os.environ.get("GOOGLE_SERVER_METADATA_URL"),
    client_kwargs={"scope": "openid email profile"},
)

# function to create jwt token
def create_jwt_token(user_info):
    """create jwt token"""
    payload = {
        "sub": user_info['email'],
        "exp": datetime.utcnow() + timedelta(hours=1),
        "iat": datetime.utcnow(),
    }
    token = jwt.encode(payload, os.environ.get("SECRET_KEY"), algorithm=os.environ.get("ALGORITHM"))
    return token

@router.get("/")
async def read_root():
    return {"status": "ready"}

# logIn route
@router.get("/auth/login")
async def login(request: Request):
    """login"""
    redirect_uri = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, redirect_uri)

# auth callback route
@router.get("/auth/callback")
async def auth(request: Request, response: Response):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo")
        if user_info:
            jwt_token = create_jwt_token(user_info)
            response = RedirectResponse(url="http://localhost:3000")
            response.set_cookie(key="token", value=jwt_token, httponly=True, max_age=3600)
            return response
        else:
            raise HTTPException(status_code=400, detail="Invalid credentials")
    except Exception as e:
        return {"error": str(e)}

@router.get('/auth/logout')
async def logout(request: Request):
    """logout"""
    request.session.pop('user', None)
    return {"message": "logout success"}
