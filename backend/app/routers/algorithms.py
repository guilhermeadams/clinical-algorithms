from fastapi import APIRouter, Depends
from app.services import algorithms, graphs
from app.schemas.algorithm import AlgorithmSchema, AlgorithmGraphSchema
from app.dependencies import get_token_header

router = APIRouter(
    prefix="/algorithms",
    tags=["algorithms"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("")
def index():
    return algorithms.index()


@router.post("")
def store(algorithm: AlgorithmSchema):
    return algorithms.store(algorithm)


@router.put("/{algorithm_id}")
def update(algorithm: AlgorithmSchema):
    return algorithms.update_algorithm(algorithm)


@router.get("/search")
def search(keyword: str | None = None):
    if keyword:
        return algorithms.search(keyword)
    return None


@router.get("/thorough-search")
def thorough_search(keyword: str | None = None):
    if keyword:
        return algorithms.thorough_search(keyword)
    return None


@router.put("/graph/{graph_id}")
def update_graph(algorithm_graph: AlgorithmGraphSchema):
    return graphs.update_graph(algorithm_graph)


@router.get("/graph/{algorithm_id}")
def search(algorithm_id: int):
    return graphs.show(algorithm_id)


@router.get("/{algorithm_id}")
def show(algorithm_id: int):
    return algorithms.show(algorithm_id)


@router.delete("/{algorithm_id}")
def delete(algorithm_id: int):
    return algorithms.delete_algorithm(algorithm_id)
