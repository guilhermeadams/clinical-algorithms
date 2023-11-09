from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/account",
    tags=["account"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


class LoginData(BaseModel):
    username: str
    password: str


@router.post("/login")
async def index(login_data: LoginData):
    if login_data.username == 'paho' and login_data.password == 'paho':
        return {"token": '89745cfd55cf9181b253981a65dbafe7'}

    return {"token": ''}
