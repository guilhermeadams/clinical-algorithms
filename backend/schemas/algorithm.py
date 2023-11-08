from pydantic import BaseModel


class AlgorithmSchema(BaseModel):
    id: int
    title: str
    description: str
    author: str
    version: str
    updated_at: str
