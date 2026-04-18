from pydantic import BaseModel

class Match(BaseModel):
    match_id: str
    team1: str
    team2: str
    status: str   # live / upcoming / completed