from fastapi import APIRouter, Depends

from ..dependencies import get_token_header

router = APIRouter(
    prefix="/algorithms",
    tags=["algorithms"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def index():
    return [{"title": "Algoritmo 1"}, {"title": "Algoritmo 2"}]


@router.get("/{algorithm_id}")
async def show(algorithm_id: int):
    return {"id": algorithm_id}


@router.post("/{algorithm_id}")
async def update_item(algorithm_id: int):
    return {"id": algorithm_id}


@router.delete("/{algorithm_id}")
async def update_item(algorithm_id: int):
    return {"id": algorithm_id}