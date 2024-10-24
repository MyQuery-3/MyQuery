"""Application backend."""
import os
from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from routes import router  # นำเข้าจาก routes.py

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

# ใช้ router จาก routes.py
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8888, reload=True)
