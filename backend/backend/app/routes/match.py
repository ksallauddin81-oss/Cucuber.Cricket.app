from fastapi import APIRouter
from app.db.database import db
from app.models.match import Match

router = APIRouter()

@router.post("/matches")
def create_match(match: Match):
    match_dict = match.dict()
    result = db["matches"].insert_one(match_dict)
    return {
        "message": "Match created successfully",
        "inserted_id": str(result.inserted_id)
    }

@router.get("/matches")
def get_matches():
    matches = list(db["matches"].find({}, {"_id": 0}))
    return {
        "matches": matches
    }

@router.get("/matches/{status}")
def get_matches_by_status(status: str):
    matches = list(db["matches"].find({"status": status}, {"_id": 0}))
    return {
        "status": status,
        "matches": matches
    }