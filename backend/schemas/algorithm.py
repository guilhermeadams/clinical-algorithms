from pydantic import BaseModel


class AlgorithmModel(BaseModel):
    id: int
    title: str
    description: str
    author: str
    version: str
