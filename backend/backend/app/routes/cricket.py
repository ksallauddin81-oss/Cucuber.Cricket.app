from fastapi import APIRouter
from app.services.cricket_service import (
    get_live_matches,
    get_recent_matches,
    get_upcoming_matches,
)

router = APIRouter(prefix="/api", tags=["cricket"])


@router.get("/live")
def live_matches():
    return {"data": get_live_matches()}


@router.get("/recent")
def recent_matches():
    return {"data": get_recent_matches()}


@router.get("/upcoming")
def upcoming_matches():
    return {"data": get_upcoming_matches()}