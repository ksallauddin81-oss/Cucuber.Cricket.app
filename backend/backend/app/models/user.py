from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    favorite_team: str   # 👈 NEW

class UserLogin(BaseModel):
    username: str
    password: str

class User(BaseModel):
    name: str
    email: str
    favorite_team: str