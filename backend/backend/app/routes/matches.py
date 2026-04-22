from fastapi import APIRouter
from app.services.cricket_api import get_live_matches, get_upcoming_matches

router = APIRouter(prefix="/matches", tags=["Matches"])


@router.get("/live-matches")
def live_matches():
    try:
        return {
            "status": "live-matches",
            "matches": get_live_matches()
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


@router.get("/upcoming")
def upcoming_matches():
    try:
        return {
            "status": "upcoming",
            "matches": get_upcoming_matches()
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }