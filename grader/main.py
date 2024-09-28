"""I am Grader for MyQuery"""
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"status": "ready"}