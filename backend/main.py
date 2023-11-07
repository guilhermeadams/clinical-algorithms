from fastapi import FastAPI
from services import algorithms_service
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/algorithms")
def get_user():
    return algorithms_service.get_algorithms()
