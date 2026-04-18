from fastapi import APIRouter
from app.db.database import db

router = APIRouter()

@router.post("/chat")
def chat(query: dict):
    user_message = query.get("message", "").lower()

    # Simple logic (we will improve later)
    if "live match" in user_message:
        matches = list(db["matches"].find({"status": "live"}, {"_id": 0}))
        return {"response": matches}

    elif "upcoming" in user_message:
        matches = list(db["matches"].find({"status": "upcoming"}, {"_id": 0}))
        return {"response": matches}

    elif "alerts" in user_message:
        alerts = list(db["alerts"].find({}, {"_id": 0}))
        return {"response": alerts}

    else:
        return {"response": "Sorry, I don't understand."}