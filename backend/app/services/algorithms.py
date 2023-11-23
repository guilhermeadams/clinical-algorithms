from app.models.algorithm import algorithm_model
from app.schemas.algorithm import AlgorithmSchema
from app.db import conn
from .data_handler import algorithm_to_dict, to_iso_date
from sqlalchemy import insert, update
from app.services import algorithms_graphs


def index():
    all_algorithms = conn.execute(
        algorithm_model.select()
    ).fetchall()

    return algorithm_to_dict(all_algorithms)


def search(keyword: str):
    algorithms_found = conn.execute(
        algorithm_model.select().where(algorithm_model.c.title.like("%"+keyword+"%"))
    ).fetchall()

    return algorithm_to_dict(algorithms_found)


def show(algorithm_id: int):
    algorithm = conn.execute(
        algorithm_model.select().where(algorithm_model.c.id == algorithm_id)
    ).fetchall()

    if len(algorithm):
        return algorithm_to_dict(algorithm)[0]


def store(algorithm: AlgorithmSchema):
    stored_algorithm = conn.execute(
        insert(algorithm_model).values(
            title=algorithm.title,
            description=algorithm.description,
            # author=algorithm.author,
            version=algorithm.version,
            updated_at=to_iso_date(algorithm.updated_at)
        )
    )

    algorithms_graphs.store(algorithm_id=stored_algorithm.lastrowid)

    conn.commit()
    return stored_algorithm


def update_algorithm(algorithm: AlgorithmSchema):
    updated_algorithm = conn.execute(
        update(algorithm_model)
        .where(algorithm_model.c.id == algorithm.id)
        .values(
            title=algorithm.title,
            description=algorithm.description,
            # author=algorithm.author,
            version=algorithm.version,
            updated_at=to_iso_date(algorithm.updated_at)
        )
    )

    conn.commit()
    return updated_algorithm


def delete(algorithm_id: int):
    # delete the graph before...
    algorithms_graphs.delete(algorithm_id)

    deleted_algorithm = conn.execute(
        algorithm_model.delete().where(algorithm_model.c.id == algorithm_id)
    )

    conn.commit()
    return deleted_algorithm
