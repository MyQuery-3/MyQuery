from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from fastapi import HTTPException
from .database import engine

def execute_query(query: str):
    try:
        with engine.connect() as connection:
            with connection.begin() as transaction:
                result = connection.execute(text(query))
                transaction.commit()
                if result.returns_rows:
                    result_list = [dict(row) for row in result.mappings()]
                    return result_list
                else:
                    row_count = result.rowcount
                    return {"message": f"Query executed successfully, affected {row_count} rows"}
    except SQLAlchemyError as e:
        print(f"SQL Error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"SQL Error: {str(e)}")
