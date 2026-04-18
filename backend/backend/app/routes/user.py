from fastapi import APIRouter, Depends
from app.db.database import db
from app.models.user import User
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.post("/users")
def create_user(user: User):
    user_dict = user.dict()
    result = db["users"].insert_one(user_dict)
    return {
        "message": "User created successfully",
        "inserted_id": str(result.inserted_id)
    }

@router.get("/users")
def get_users(current_user: dict = Depends(get_current_user)):
    users = list(db["users"].find({}, {"_id": 0}))
    return {
        "message": "Protected route accessed successfully",
        "logged_in_user": current_user,
        "users": users
    }