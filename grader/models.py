from pydantic import BaseModel

# Pydantic model สำหรับ SQL query
class SQLQuery(BaseModel):
    query: str