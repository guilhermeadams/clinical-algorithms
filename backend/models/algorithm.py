from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Text
from db import meta

algorithms = Table(
    'algorithms',
    meta,
    Column('id', Integer, primary_key=True, index=True),
    Column('title', String(255), index=True),
    Column('description', Text, index=True),
    Column('author', String(255)),
    Column('version', String(10))
)
