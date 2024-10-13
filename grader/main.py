'''Grader for my query app'''
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",
    "http://localhost:8787",
]
# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base model for the query
class Ececute(BaseModel):
    databseName : str
    tableName : str
    query: str

@app.get("/")
async def root():
    return {"status": "Ready"}

@app.post("/grader/execute")
async def execute(exexute: Ececute):
    print(exexute.query)
    return {"result": exexute.query}

@app.post("/grader/history")
async def history():
    return {"result": "route for history"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8787, reload=True)
