from fastapi import APIRouter, Depends
from services import algorithms
from dependencies import get_token_header

router = APIRouter(
    prefix="/algorithms",
    tags=["algorithms"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_user():
    return algorithms.get_all()
