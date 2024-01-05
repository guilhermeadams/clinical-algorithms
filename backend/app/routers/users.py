from fastapi import APIRouter, Depends
from app.services import users
from app.dependencies import get_token_header
from app.schemas.user import UserSchema

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("")
def index():
    return users.index()


@router.post("")
def store(user: UserSchema):
    return users.store(user)


@router.put("")
def update(user: UserSchema):
    return users.update_user(user)


@router.delete("/{user_id}")
def delete(user_id: int):
    return users.delete_user(user_id)
