from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from fastapi import HTTPException
from .database import engine, engine_expire
import re
from datetime import datetime, timedelta

def get_all_expire_dates():
    """ดึงข้อมูล expire date ของทุกตารางจาก database_store"""
    try:
        with engine_expire.connect() as connection:
            result = connection.execute(
                text("SELECT db_name, expire FROM database_store")
            ).mappings().fetchall()
            return {row["db_name"]: row["expire"] for row in result}  # คืนค่าเป็น dict ของ db_name -> expire
    except SQLAlchemyError as e:
        print(f"SQL Error in get_all_expire_dates: {str(e)}")
        raise HTTPException(status_code=400, detail=f"SQL Error in get_all_expire_dates: {str(e)}")

def cleanup_expired_tables():
    """ตรวจสอบและลบ table ที่หมดอายุออกจาก engine และ engine_expire"""
    try:
        current_time = datetime.now()
        with engine_expire.connect() as expire_connection:
            expired_tables = expire_connection.execute(
                text("SELECT db_name FROM database_store WHERE expire <= :current_time"),
                {"current_time": current_time}
            ).mappings().fetchall()

            for row in expired_tables:
                table_name = row['db_name']
                print(f"Deleting expired table: {table_name}")

                # ลบตารางจาก engine และลบข้อมูลจาก database_store แบบ atomic
                with engine.begin() as connection:
                    connection.execute(text(f"DROP TABLE IF EXISTS {table_name}"))
                    expire_connection.execute(
                        text("DELETE FROM database_store WHERE db_name = :db_name"),
                        {"db_name": table_name}
                    )
                    connection.commit()
    except SQLAlchemyError as e:
        print(f"SQL Error in cleanup: {str(e)}")

def execute_query(query: str):
    restricted_tables = ["users", "deployment", "employee"]
    restricted_commands = ["create", "drop", "delete", "insert"]

    # เรียก cleanup_expired_tables เพื่อลบตารางที่หมดอายุ
    cleanup_expired_tables()

    expire_dates = get_all_expire_dates()

    # ตรวจสอบคำสั่งและชื่อตารางที่ถูกจำกัด
    for command in restricted_commands:
        for table in restricted_tables:
            pattern = rf"\b{command}\b.*\b{table}\b"
            if re.search(pattern, query, re.IGNORECASE):
                raise HTTPException(status_code=400, detail="Operation not allowed on restricted tables")

    expire_date = None
    # ตรวจสอบว่าเป็นคำสั่ง CREATE TABLE ไหม และตั้งวันหมดอายุ
    create_table_match = re.search(r"create\s+table\s+(\w+)", query, re.IGNORECASE)
    if create_table_match:
        table_name = create_table_match.group(1)
        expire_date = datetime.now() + timedelta(days=1)

        # เพิ่มข้อมูลเข้า database_store ใน engine_expire
        try:
            with engine_expire.connect() as expire_connection:
                expire_query = text("INSERT INTO database_store (db_name, expire) VALUES (:db_name, :expire)")
                expire_connection.execute(expire_query, {"db_name": table_name, "expire": expire_date})
                expire_connection.commit()
                print(f"Inserting table: {table_name} with expire date: {expire_date}")
        except SQLAlchemyError as e:
            print(f"SQL Error in database_store insertion: {str(e)}")
            raise HTTPException(status_code=400, detail=f"SQL Error in engine_expire insertion: {str(e)}")

    # ดำเนินการ query หลัก
    try:
        with engine.connect() as connection:
            with connection.begin() as transaction:
                result = connection.execute(text(query))
                transaction.commit()
                if result.returns_rows:
                    result_list = [
                        dict(row, expire=expire_dates.get(row.get("name"), None))
                        for row in result.mappings()
                    ]
                    return {"result": result_list}
                else:
                    row_count = result.rowcount
                    return {
                        "result": [{"message": f"Query executed successfully, affected {row_count} rows", "expire": expire_date}]
                    }
    except SQLAlchemyError as e:
        print(f"SQL Error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"SQL Error: {str(e)}")
