from sqlalchemy import create_engine

engine = create_engine("sqlite:///./myquery.db")

connection = engine.connect()
print("Connected to SQLite")
connection.close()

