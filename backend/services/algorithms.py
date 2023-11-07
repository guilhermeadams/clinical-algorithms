from models.index import algorithms
from db import conn


def get_all():
    all_algorithms = conn.execute(algorithms.select()).fetchall()

    items = []
    item = {}
    for algorithm in all_algorithms:
        item = {
            'id': algorithm[0],
            'title': algorithm[1],
            'description': algorithm[2],
            'author': algorithm[3],
            'version': algorithm[4]
        }
        items.append(item)
        item = {}

    return items