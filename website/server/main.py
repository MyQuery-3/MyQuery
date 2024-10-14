"""Application backend."""
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import uvicorn
from starlette.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse, Response, RedirectResponse

from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

from starlette.middleware.sessions import SessionMiddleware

from datetime import datetime, timedelta
import jwt

load_dotenv()
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=os.environ.get("SECRET_KEY"))

origins = [
    "http://localhost:3000",
    "http://localhost:8888",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    payload = {
        "sub": user_info['email'],
        "exp": datetime.utcnow() + timedelta(hours=1),
        "iat": datetime.utcnow(),
    }
    token = jwt.encode(payload, os.environ.get("SECRET_KEY"), algorithm=os.environ.get("ALGORITHM"))
    return token

@app.get("/")
async def read_root():
    return {"status": "ready"}

# logIn route
@app.get("/auth/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, redirect_uri)

# auth callback route
@app.get("/auth/callback")
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
    
@app.get('/auth/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return {"message": "logout success"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8888, reload=True)
