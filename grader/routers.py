from fastapi import APIRouter, HTTPException
from .models import DBName, SQLQuery
from .utils import execute_query

router = APIRouter()

@router.get("/")
async def root():
    return {"status": "Ready"}

@router.post("/api/execute")
async def execute(sql_query: SQLQuery):
    try:
        result_data = execute_query(sql_query.query)
        return {"result": result_data["result"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/api/get")
async def execute():
    try:
        result_data = execute_query("SELECT name FROM sqlite_master WHERE type='table'")
        return {"result": result_data["result"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/api/execute_click")
async def execute(dbName: DBName):
    try:
        result_data = execute_query(f'SELECT * FROM {dbName.dbName}')
        return {"result": result_data["result"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

