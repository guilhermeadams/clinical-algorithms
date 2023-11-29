import json
from datetime import datetime
from app.pymsql import conn, select, delete, db_error
from pymysql import Error

node_fields = ['id', 'algorithm_id', 'node_id', 'node_type', 'label']


def map_nodes(graph_string: str, algorithm_id: str):
    try:
        delete("nodes", "algorithm_id", algorithm_id)

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

            fields = "algorithm_id, node_id, node_type, label, updated_at"
            insert_stmt = "INSERT INTO nodes ("+fields+") VALUES (%s, %s, %s, %s, %s)"

            db = conn()
            with db:
                with db.cursor() as cursor:
                    cursor.execute(
                        insert_stmt,
                        (data['algorithm_id'], data['node_id'], data['node_type'], data['label'], datetime.now())
                    )

                    db.commit()

        return True
    except Error as e:
        db_error(e)


def search_nodes(keyword: str):
    try:
        return select("SELECT * FROM nodes WHERE label REGEXP %s", "[[:<:]]"+keyword+"[[:>:]]")
    except Error as e:
        db_error(e)
