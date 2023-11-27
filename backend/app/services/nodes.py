import json
from datetime import datetime
from app.db import conn
from app.models.nodes import node_model
from sqlalchemy import insert


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
