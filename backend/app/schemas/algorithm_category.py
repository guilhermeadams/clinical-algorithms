from pydantic import BaseModel


class AlgorithmCategorySchema(BaseModel):
    id: int
    name: str
    updated_at: str | None = None


class AlgorithmCategoryRelationSchema(BaseModel):
    id: int
    algorithm_id: int
    category_id: int
    updated_at: str | None = None
