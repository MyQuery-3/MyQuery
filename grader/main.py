import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)


# # CORS settings
# origins = [
#     "http://localhost:3000",
#     "http://localhost:8787",
# ]

# # Middleware สำหรับ CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# รวม router เข้ากับแอป
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("grader.main:app", host="localhost", port=8787, reload=True)
