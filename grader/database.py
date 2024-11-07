from sqlalchemy import create_engine

# ตั้งค่าการเชื่อมต่อฐานข้อมูล
engine = create_engine("sqlite:///grader/myquery.db")
engine_expire = create_engine("sqlite:///grader/expire.db")