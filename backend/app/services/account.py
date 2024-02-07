from app.services.pymsql import insert, update, select, delete, db_error
from pymysql import Error
from app.services.data import encrypt_password


def login(email: str, password: str):
    try:
        user = select(
            "SELECT id, name FROM users WHERE email = %s AND password = %s",
            [email, encrypt_password(password)],
        )
        if user:
            return user[0]

    except Error as e:
        db_error(e)
