from sqlalchemy import Table, Column, Integer, String, MetaData
from .database import engine

metadata = MetaData()

users = Table('users', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String),
    Column('email', String)
)

metadata.create_all(engine)
