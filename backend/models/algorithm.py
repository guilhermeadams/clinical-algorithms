from sqlalchemy import Table, Column, DATE, TEXT, VARCHAR, BIGINT
from db import meta

algorithms = Table(
    'algorithms',
    meta,
    Column('id', BIGINT, primary_key=True, index=True),
    Column('title', VARCHAR(255), index=True),
    Column('description', TEXT, index=True),
    # Column('author', VARCHAR(255)),
    Column('version', VARCHAR(10)),
    Column('updated_at', DATE)
)


algorithms_graphs = Table(
    'algorithms_graphs',
    meta,
    Column('id', BIGINT, primary_key=True, index=True),
    Column('algorithm_id', BIGINT, primary_key=True, index=True),
    Column('graph', TEXT),
    Column('updated_at', DATE)
)
