from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "success": True,
        "message": "Cucuber backend is running",
        "timestamp": datetime.utcnow().isoformat()
    }