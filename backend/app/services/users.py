from app.services.pymsql import insert, select, db_error
from app.schemas.user import UserSchema
from .data_handler import to_iso_date
from datetime import datetime
from pymysql import Error


def index():
    try:
        return select("SELECT * FROM users")
    except Error as e:
        db_error(e)


def store(user_data: UserSchema):
    try:
        user_id = insert(
            "users",
            ["name", "email", "password", "phone", "maintainer", "master", "updated_at"],
            [
                user_data.name,
                user_data.email,
                user_data.password,
                user_data.phone,
                user_data.maintainer,
                user_data.master,
                datetime.today().strftime('%Y-%m-%d'),
            ],
        )

        return {"user_id": user_id}
    except Error as e:
        db_error(e)
