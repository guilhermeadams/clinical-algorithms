import json
from datetime import datetime
from app.db import conn
from app.models.algorithm import algorithm_model
from app.models.nodes import node_model
from sqlalchemy import insert, exc, select
from app.services.data_handler import result_to_dict

node_fields = ['id', 'algorithm_id', 'node_id', 'node_type', 'label']


def map_nodes(graph_string: str, algorithm_id: int):
    conn.execute(
        node_model.delete().where(node_model.c.algorithm_id == algorithm_id)
    )

    graph = json.loads(graph_string)['cells']

    nodes = []
    for node in graph:
        data = {
            "algorithm_id": algorithm_id,
            "node_id": node['id'],
            "node_type": node['type'],
            "label": "",
        }

        if "props" in node:
            if "label" in node['props']:
                data['label'] = node['props']['label']

        nodes.append(data)

        print('nodes')
        print(json.dumps(nodes, indent=2))

        conn.execute(
            insert(node_model).values(
                algorithm_id=data['algorithm_id'],
                node_id=data['node_id'],
                node_type=data['node_type'],
                label=data['label'],
                updated_at=datetime.now(),
            )
        )

    conn.commit()

    return True


def search_nodes(keyword: str):
    try:
        nodes_found = conn.execute(
            select(node_model).join(
                algorithm_model, algorithm_model.c.id == node_model.c.algorithm_id
            ).where(
                node_model.c.label.like("%"+keyword+"%")
            )
        ).fetchall()

        return result_to_dict(nodes_found, node_fields)
    except exc.SQLAlchemyError:
        conn.rollback()
        raise
