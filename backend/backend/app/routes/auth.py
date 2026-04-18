from fastapi import APIRouter
from app.db.database import db
from app.models.user import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password, create_token

router = APIRouter()

@router.post("/signup")
def signup(user: UserCreate):
    try:
        existing_user = db["auth_users"].find_one({"username": user.username})

        if existing_user:
            return {"message": "Username already exists"}

        hashed_password = hash_password(user.password)

        user_data = {
            "username": user.username,
            "password": hashed_password,
            "favorite_team": user.favorite_team
        }

        result = db["auth_users"].insert_one(user_data)

        return {
            "message": "Signup successful",
            "inserted_id": str(result.inserted_id),
            "favorite_team": user.favorite_team
        }

    except Exception as e:
        return {"error": str(e)}

@router.post("/login")
def login(user: UserLogin):
    try:
        existing_user = db["auth_users"].find_one({"username": user.username})

        if not existing_user:
            return {"message": "User not found"}

        if verify_password(user.password, existing_user["password"]):
            token = create_token({"username": user.username})
            return {
                "message": "Login successful",
                "token": token,
                "favorite_team": existing_user.get("favorite_team", "")
            }

        return {"message": "Invalid password"}

    except Exception as e:
        return {"error": str(e)}