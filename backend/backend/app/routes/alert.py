from fastapi import APIRouter, Depends
from app.db.database import db
from app.models.alert import Alert
from app.dependencies.auth import get_current_user
from datetime import datetime

router = APIRouter()

@router.post("/alerts")
def create_alert(alert: Alert, current_user: dict = Depends(get_current_user)):
    alert_dict = alert.dict()
    alert_dict["username"] = current_user["username"]
    alert_dict["created_at"] = datetime.utcnow().isoformat()

    result = db["alerts"].insert_one(alert_dict)

    return {
        "message": "Alert created successfully",
        "inserted_id": str(result.inserted_id)
    }

@router.get("/alerts")
def get_alerts(current_user: dict = Depends(get_current_user)):
    user = db["auth_users"].find_one({"username": current_user["username"]})

    favorite_team = user.get("favorite_team")

    alerts = list(
        db["alerts"]
        .find({"team": favorite_team}, {"_id": 0})
        .sort("created_at", -1)
    )

    return {
        "favorite_team": favorite_team,
        "alerts": alerts
    }