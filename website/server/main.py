"""Application backend."""
import os
from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
from starlette.requests import Request

from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

from starlette.middleware.sessions import SessionMiddleware

load_dotenv()
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=os.environ.get("SECRET_KEY"))

config = Config(".env")
oauth = OAuth(config)
oauth.register(
    name="google",
    server_metadata_url=os.environ.get("GOOGLE_SERVER_METADATA_URL"),
    client_kwargs={"scope": "openid email profile"},
)

@app.get("/")
async def read_root():
    return {"status": "ready"}

@app.get("/auth/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth")
async def auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user = token.get("userinfo")
        if user:
            request.session["user"] = user
            return {"message": "login success"}
    except Exception as e:
        return {"error": str(e)}
    
@app.get('/auth/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return {"message": "logout success"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8888, reload=True)
