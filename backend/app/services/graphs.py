from datetime import datetime
from app.db import conn
from app.models.algorithm import graph_model
from sqlalchemy import insert, update, exc
from .data_handler import algorithm_graph_to_dict
from app.schemas.algorithm import AlgorithmGraphSchema
# from app.services import nodes


def update_graph(algorithm_graph: AlgorithmGraphSchema):
    try:
        conn.execute(
            update(graph_model)
            .where(graph_model.c.id == algorithm_graph.id)
            .values(
                graph=algorithm_graph.graph,
                updated_at=datetime.now()
            )
        )

        conn.commit()

        # nodes.map_nodes(algorithm_graph.graph, algorithm_graph.id)

        return show(algorithm_graph.algorithm_id)
    # except exc.SQLAlchemyError as e:
    #     return e.__dict__['orig']
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def show(algorithm_id: int):
    algorithm_graph = conn.execute(
        graph_model.select().where(graph_model.c.algorithm_id == algorithm_id)
    ).fetchall()

    if len(algorithm_graph):
        return algorithm_graph_to_dict(algorithm_graph)[0]


def store(algorithm_id: int):
    try:
        stored_algorithm_graph = conn.execute(
            insert(graph_model).values(
                algorithm_id=algorithm_id,
                graph=None,
                updated_at=datetime.now()
            )
        )

        conn.commit()

        # query being committed by its caller
        return stored_algorithm_graph
    # except exc.SQLAlchemyError as e:
    #     return e.__dict__['orig']
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def delete(algorithm_id: int):
    try:
        deleted_algorithm_graph = conn.execute(
            graph_model.delete().where(graph_model.c.algorithm_id == algorithm_id)
        )

        conn.commit()

        return deleted_algorithm_graph
    # except exc.SQLAlchemyError as e:
    #     return e.__dict__['orig']
    except exc.SQLAlchemyError:
        conn.rollback()
        raise
