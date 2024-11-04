from fastapi import APIRouter, HTTPException
from .models import SQLQuery
from .utils import execute_query

router = APIRouter()

@router.get("/")
async def root():
    return {"status": "Ready"}

@router.post("/api/execute")
async def execute(sql_query: SQLQuery):
    try:
        result = execute_query(sql_query.query)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/get")
async def execute():
    try:
        result = execute_query("SELECT name FROM sqlite_master WHERE type='table'")
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))