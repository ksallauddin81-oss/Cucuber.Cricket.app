from pydantic import BaseModel, EmailStr

# existing (keep)
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str


# new (add this)
class User(BaseModel):
    name: str
    email: EmailStr
    favorite_team: str