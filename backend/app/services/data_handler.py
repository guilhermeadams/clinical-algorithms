from sqlite3 import Row
from typing import Sequence, List


def result_to_dict(rows: Sequence[Row], fields: List[str]):
    items = []

    if len(rows):
        for row in rows:
            new_item = {}
            for index, field in enumerate(fields):
                new_item[field] = row[index]
            items.append(new_item)
    return items


def algorithm_graph_to_dict(rows: Sequence[Row]):
    items = []
    item = {}
    for row in rows:
        item = {
            'id': row[0],
            'algorithm_id': row[1],
            'graph': row[2],
            'updated_at': row[3]
        }
        items.append(item)
        item = {}

    return items


def to_iso_date(date: str):
    if not date:
        return ''
    else:
        return date[6:10] + "/" + date[3:5] + "/" + date[0:2] + ' 00:00:00'
