from app.schemas.category import CategorySchema
from app.services.pymsql import insert, select


def index():
    try:
        return select("SELECT * FROM categories")
    except Error as e:
        db_error(e)


def store(category: CategorySchema):
    try:
        category_id = insert(
            "categories",
            ["name", "updated_at"],
            [category.name, to_iso_date(category.updated_at)],
        )

        return {"category_id": category_id}
    except Error as e:
        db_error(e)
