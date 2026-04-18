from fastapi import APIRouter
from app.db.database import collection

router = APIRouter()

@router.get("/db-test")
def db_test():
    try:
        data = {"message": "MongoDB connected"}
        result = collection.insert_one(data)
        return {
            "message": "MongoDB connected",
            "inserted_id": str(result.inserted_id)
        }
    except Exception as e:
        return {"error": str(e)}