from app.services.pymsql import select, db_error


def index():
    try:
        return select("SELECT * FROM users")
    except Error as e:
        db_error(e)
