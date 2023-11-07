from fastapi import APIRouter, Depends
from services import algorithms
from schemas.algorithm import AlgorithmModel
from dependencies import get_token_header

router = APIRouter(
    prefix="/algorithms",
    tags=["algorithms"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def index():
    return algorithms.index()


@router.post("/")
def store(algorithm: AlgorithmModel):
    return algorithms.store(algorithm)


@router.get("/{algorithm_id}")
def show(algorithm_id: int):
    return algorithms.show(algorithm_id)
