from app.models.algorithm import algorithm_model
from app.schemas.algorithm import AlgorithmSchema
from app.db import conn
from .data_handler import algorithm_to_dict, to_iso_date
from sqlalchemy import insert, update, exc
from app.services import graphs


def index():
    try:
        all_algorithms = conn.execute(
            algorithm_model.select()
        ).fetchall()

        return algorithm_to_dict(all_algorithms)
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def search(keyword: str):
    try:
        algorithms_found = conn.execute(
            algorithm_model.select().where(algorithm_model.c.title.like("%"+keyword+"%"))
        ).fetchall()

        return algorithm_to_dict(algorithms_found)
    except exc.SQLAlchemyError:
        conn.rollback()
        raise


def show(algorithm_id: int):
    try:
        algorithm = conn.execute(
            algorithm_model.select().where(algorithm_model.c.id == algorithm_id)
        ).fetchall()

        if len(algorithm):
            return algorithm_to_dict(algorithm)[0]
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
