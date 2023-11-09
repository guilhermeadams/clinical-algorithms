from pydantic import BaseModel


class AlgorithmSchema(BaseModel):
    id: int
    title: str
    description: str
    # author: str
    version: str
    updated_at: str


class AlgorithmGraphSchema(BaseModel):
    id: int
    algorithm_id: int | None = None
    graph: str
    updated_at: str | None = None


class AlgorithmGraphUpdateSchema(BaseModel):
    id: int
    graph: str
