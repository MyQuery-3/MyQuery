"""I am Grader for MyQuery"""
from fastapi import FastAPI
import sqlite3
import uvicorn
from pydantic import BaseModel
import uuid

app = FastAPI()


async def create_temp_table():
    conn = sqlite3.connect("myquery.db")
    table_name = f"temp_{uuid.uuid4()}"
    print(f"Creating table {table_name}")
    cursor = conn.cursor()
    cursor.execute(f"CREATE TABLE {table_name}")
    print(f"Created table {table_name}")
    return conn, table_name, cursor


@app.get("/")
async def getStatus():
    return {"status": "ready"}


@app.post("/grade")
async def grade():
    try:
        conn, table_name, cursor = await create_temp_table()
        return {"status": "success", "table_name": table_name}
    except Exception as e:
        print(e)
        return {"status": "error", "message": str(e)}


uvicorn.run(app, host="0.0.0.0", port=8787)
