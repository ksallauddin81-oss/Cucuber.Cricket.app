from pydantic import BaseModel

class Alert(BaseModel):
    match_id: str
    team: str           
    alert_type: str
    message: str