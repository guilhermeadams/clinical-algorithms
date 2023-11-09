from sqlalchemy import create_engine, MetaData
from dotenv import dotenv_values
# from sqlalchemy.orm import sessionmaker

config = dotenv_values(".env")

db_config = {
    "host": config["DB_HOST"],
    "port": config["DB_PORT"],
    "user": config["DB_USER"],
    "pass": config["DB_PASS"],
    "name": config["DB_NAME"],
}

DB_URL = "mysql+pymysql://"+db_config['user']+":"+db_config['pass']+"@"
DB_URL += db_config['host']+":"+db_config['port']+"/"+db_config['name']

engine = create_engine(DB_URL)

# TODO: Learn how this things works.
# SessionLocal = sessionmaker(autocommit=True, autoflush=False, bind=engine)
# Base = declarative_base()

meta = MetaData()

conn = engine.connect()
