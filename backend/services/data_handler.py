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
            'version': row[3],
            'updated_at': row[4]
        }
        items.append(item)
        item = {}

    return items


def to_iso_date(date: str):
    if not date:
        return ''
    else:
        return date[6:10] + "/" + date[3:5] + "/" + date[0:2] + ' 00:00:00'
