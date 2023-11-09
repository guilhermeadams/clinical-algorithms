from datetime import datetime
from db import conn
from models.index import algorithms_graphs as algorithms_graphs_model
from sqlalchemy import insert, update
from .data_handler import algorithm_graph_to_dict
from schemas.algorithm import AlgorithmGraphSchema


def update_graph(algorithm_graph: AlgorithmGraphSchema):
    updated_algorithm = conn.execute(
        update(algorithms_graphs_model)
        .where(algorithms_graphs_model.c.id == algorithm_graph.id)
        .values(
            graph=algorithm_graph.graph,
            updated_at=datetime.now()
        )
    )

    conn.commit()
    return updated_algorithm


def show(algorithm_id: int):
    algorithm_graph = conn.execute(
        algorithms_graphs_model.select().where(algorithms_graphs_model.c.algorithm_id == algorithm_id)
    ).fetchall()

    if len(algorithm_graph):
        return algorithm_graph_to_dict(algorithm_graph)[0]


def store(algorithm_id: int):
    stored_algorithm_graph = conn.execute(
        insert(algorithms_graphs_model).values(
            algorithm_id=algorithm_id,
            graph=None,
            updated_at=datetime.now()
        )
    )

    # query being committed by its caller
    return stored_algorithm_graph


def delete(algorithm_id: int):
    deleted_algorithm_graph = conn.execute(
        algorithms_graphs_model.delete().where(algorithms_graphs_model.c.algorithm_id == algorithm_id)
    )

    conn.commit()
    return deleted_algorithm_graph
