from app.models.algorithm import algorithm_model
from app.services.nodes import search_nodes
from app.schemas.algorithm import AlgorithmSchema
from app.db import conn
from .data_handler import result_to_dict, to_iso_date
from sqlalchemy import insert, update, exc
from app.services import graphs


def index():
    try:
        all_algorithms = conn.execute(
            algorithm_model.select()
        ).fetchall()

        return result_to_dict(all_algorithms)
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def search(keyword: str):
    try:
        algorithms_found = conn.execute(
            algorithm_model.select().where(algorithm_model.c.title.like("%"+keyword+"%"))
        ).fetchall()

        return result_to_dict(algorithms_found)
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def thorough_search(keyword: str):
    try:
        nodes_found = search_nodes(keyword)

        results = {}

        for node_found in nodes_found:
            results[node_found['algorithm_id']] = {
                "title": "",
                "description": "",
                "nodes": []
            }

        for node_found in nodes_found:
            results[node_found['algorithm_id']]['nodes'].append(node_found)
            if not results[node_found['algorithm_id']]['title']:
                algorithm_found = conn.execute(
                    algorithm_model.select().where(algorithm_model.c.id == node_found['algorithm_id'])
                ).fetchone()

                results[node_found['algorithm_id']]['title'] = algorithm_found[1]
                results[node_found['algorithm_id']]['description'] = algorithm_found[2]

        return results
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def show(algorithm_id: int):
    try:
        algorithm = conn.execute(
            algorithm_model.select().where(algorithm_model.c.id == algorithm_id)
        ).fetchall()

        if len(algorithm):
            return result_to_dict(algorithm)[0]
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def store(algorithm: AlgorithmSchema):
    try:
        stored_algorithm = conn.execute(
            insert(algorithm_model).values(
                title=algorithm.title,
                description=algorithm.description,
                version=algorithm.version,
                updated_at=to_iso_date(algorithm.updated_at)
            )
        )

        conn.commit()

        graphs.store(algorithm_id=stored_algorithm.lastrowid)

        return stored_algorithm
    # except exc.SQLAlchemyError as e:
    except exc.SQLAlchemyError:
        conn.rollback()
        raise
        # return e.__dict__['orig']


def update_algorithm(algorithm: AlgorithmSchema):
    try:
        updated_algorithm = conn.execute(
            update(algorithm_model)
            .where(algorithm_model.c.id == algorithm.id)
            .values(
                title=algorithm.title,
                description=algorithm.description,
                version=algorithm.version,
                updated_at=to_iso_date(algorithm.updated_at)
            )
        )

        conn.commit()

        return updated_algorithm
    # except exc.SQLAlchemyError as e:
    #     return e.__dict__['orig']
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def delete(algorithm_id: int):
    try:
        # delete the graph before...
        graphs.delete(algorithm_id)

        deleted_algorithm = conn.execute(
            algorithm_model.delete().where(algorithm_model.c.id == algorithm_id)
        )

        conn.commit()

        return deleted_algorithm
    # except exc.SQLAlchemyError as e:
    #     return e.__dict__['orig']
    except exc.SQLAlchemyError:
        conn.rollback()
        raise
