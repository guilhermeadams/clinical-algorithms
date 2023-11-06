from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

config = dotenv_values(".env")

db_url = "mysql+mysqldb://"+config['DB_USER']+":"+config['DB_PASS']+"@"+config['DB_HOST']+":"+config['DB_PORT']+"/"+config['DB_NAME']

engine = create_engine(db_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
