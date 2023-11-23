from sqlalchemy import Table, Column, DATE, TEXT, VARCHAR, BIGINT, Enum
from app.db import meta
from app.models.models_enums import NodesTypes


node_model = Table(
    'nodes',
    meta,
    Column('id', BIGINT, primary_key=True, index=True),
    Column('algorithm_id', BIGINT, index=True),
    Column('node_id', BIGINT, index=True),
    Column('node_type', Enum(NodesTypes)),
    Column('label', VARCHAR(255)),
    Column('updated_at', DATE)
)
