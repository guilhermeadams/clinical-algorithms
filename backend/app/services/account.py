from app.services.pymsql import insert, update, select, delete, db_error
from pymysql import Error

def login(email: str, password: str):
    try:
        user = select("SELECT * FROM users WHERE email = %s AND password = %s", [email, password])
        if user:
            return user[0]

    except Error as e:
        db_error(e)
