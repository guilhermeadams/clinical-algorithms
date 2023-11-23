from datetime import datetime
from app.db import conn
from app.models.algorithm import algorithm_graph_model
from sqlalchemy import insert, update
from .data_handler import algorithm_graph_to_dict
from app.schemas.algorithm import AlgorithmGraphSchema


def update_graph(algorithm_graph: AlgorithmGraphSchema):
    updated_algorithm = conn.execute(
        update(algorithm_graph_model)
        .where(algorithm_graph_model.c.id == algorithm_graph.id)
        .values(
            graph=algorithm_graph.graph,
            updated_at=datetime.now()
        )
    )

    conn.commit()
    return show(algorithm_graph.algorithm_id)


def show(algorithm_id: int):
    algorithm_graph = conn.execute(
        algorithm_graph_model.select().where(algorithm_graph_model.c.algorithm_id == algorithm_id)
    ).fetchall()

    if len(algorithm_graph):
        return algorithm_graph_to_dict(algorithm_graph)[0]


def store(algorithm_id: int):
    stored_algorithm_graph = conn.execute(
        insert(algorithm_graph_model).values(
            algorithm_id=algorithm_id,
            graph=None,
            updated_at=datetime.now()
        )
    )

    # query being committed by its caller
    return stored_algorithm_graph


def delete(algorithm_id: int):
    deleted_algorithm_graph = conn.execute(
        algorithm_graph_model.delete().where(algorithm_graph_model.c.algorithm_id == algorithm_id)
    )

    conn.commit()
    return deleted_algorithm_graph
