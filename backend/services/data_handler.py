from sqlite3 import Row
from typing import Sequence


def to_dict(rows: Sequence[Row]):
    items = []
    item = {}
    for row in rows:
        item = {
            'id': row[0],
            'title': row[1],
            'description': row[2],
            'author': row[3],
            'version': row[4]
        }
        items.append(item)
        item = {}

    return items
