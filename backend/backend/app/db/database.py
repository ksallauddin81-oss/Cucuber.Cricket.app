from pymongo import MongoClient
from app.config.settings import settings

client = MongoClient(settings.MONGO_URL, serverSelectionTimeoutMS=5000)

db = client["cucuber_db"]
collection = db["test_collection"]