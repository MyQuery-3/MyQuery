'''Grader for my query app'''
import os
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from sqlalchemy.exc import SQLAlchemyError

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

# Pydantic model for SQL query
class SQLQuery(BaseModel):
    query: str
    
def execute_query(query: str):
    try:
        with engine.connect() as connection:
            result = connection.execute(query)
            if result.returns_rows:
                result_list = [dict(row) for row in result.mappings()]
                return result_list
            else:
                return {"message": "Query executed successfully"}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"SQL Error: {str(e)}")

@app.get("/")
async def root():
    return {"status": "Ready"}

@app.post("/api/execute")
async def execute(sql_query: SQLQuery):
    try:
        result = execute_query(sql_query.query)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8787, reload=True)
