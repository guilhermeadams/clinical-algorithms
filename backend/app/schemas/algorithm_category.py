from pydantic import BaseModel


class AlgorithmCategorySchema(BaseModel):
    id: int
    algorithm_id: int
    category_id: int
    updated_at: str | None = None
