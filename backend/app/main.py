from fastapi import Depends, FastAPI
from .routers import algorithms, account
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(algorithms.router)
app.include_router(account.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost.tiangolo.com",
        "https://localhost.tiangolo.com",
        "http://localhost",
        "http://localhost:8080",
        "http://172.22.0.2:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello world!"}
