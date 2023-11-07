from models.index import algorithms as algorithm_model
from schemas.algorithm import AlgorithmModel
from db import conn
from .data_handler import to_dict



def index():
    all_algorithms = conn.execute(
        algorithm_model.select()
    ).fetchall()

    return to_dict(all_algorithms)


def show(algorithm_id: int):
    algorithm = conn.execute(
        algorithm_model.select().where(algorithm_model.c.id == algorithm_id)
    ).fetchall()

    if len(algorithm):
        return to_dict(algorithm)[0]


def store(algorithm: AlgorithmModel):
    algorithm = conn.execute(
        algorithm_model.update()
        .where(algorithm_model.c.id == algorithm.id)
        .values(
            title=algorithm.title,
            description=algorithm.description,
            author=algorithm.author,
            version=algorithm.version
        )
    )
    return algorithm
