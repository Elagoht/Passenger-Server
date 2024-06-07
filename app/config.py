import os


class Config:
    AES_SECRET_KEY = os.getenv("AES_SECRET_KEY")
