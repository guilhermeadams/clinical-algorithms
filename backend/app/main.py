from fastapi import FastAPI
from .routers import account, algorithms
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(account.router)
app.include_router(algorithms.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
