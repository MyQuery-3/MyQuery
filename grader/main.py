import uvicorn
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from .routers import router
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware

# ตั้งค่า origins
origins = ["*"]

# ตั้งค่า middleware CORS
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,            # อนุญาตทุก origin
        allow_credentials=True,           # อนุญาตการส่ง cookies หรือ credentials
        allow_methods=["*"],              # อนุญาตทุก HTTP method เช่น GET, POST, PUT
        allow_headers=["*"],              # อนุญาตทุก HTTP header
    )
]

# กำหนด middleware ให้กับ FastAPI
app = FastAPI(middleware=middleware)

# รวม router เข้ากับแอป
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("grader.main:app", host="localhost", port=8787, reload=True)
