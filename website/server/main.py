"""Application backend."""
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
async def read_root():
    return {"status": "ready"}

uvicorn.run(app, host="0.0.0.0", port=8888)
