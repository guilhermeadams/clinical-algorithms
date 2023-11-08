from fastapi import APIRouter, Depends
from services import algorithms
from schemas.algorithm import AlgorithmSchema
from dependencies import get_token_header

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
    return {}


@router.get("/{algorithm_id}")
def show(algorithm_id: int):
    return algorithms.show(algorithm_id)


@router.delete("/{algorithm_id}")
def delete(algorithm_id: int):
    return algorithms.delete(algorithm_id)
