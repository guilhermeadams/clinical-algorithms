import json
from app.db import conn
from app.models.nodes import node_model


def map_nodes(graph_string: str, algorithm_id: int):
    conn.execute(
        node_model.delete().where(node_model.c.algorithm_id == algorithm_id)
    )

    graph = json.loads(graph_string)['cells']

    nodes = []
    for node in graph:
        data = {
            "algorithm_id": algorithm_id,
            "id": node['id'],
            "node_type": node['type'],
            "label": "",
        }

        if "props" in node:
            if "label" in node['props']:
                data['label'] = node['props']['label']

        nodes.append(data)
    print('nodes')
    print(json.dumps(nodes, indent=2))
    # conn.execute(
    #     insert(graph_model).values(
    #         algorithm_id=algorithm_id,
    #         graph=None,
    #         updated_at=datetime.now()
    #     )
    # )
    return True
