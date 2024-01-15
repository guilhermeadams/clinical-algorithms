import hashlib


def encrypt_password(password: str):
    return hashlib.sha512(password.encode('utf-8')).hexdigest()
