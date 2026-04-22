from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings

# Import all routes
from app.routes.health import router as health_router
from app.routes.db_test import router as db_router
from app.routes.user import router as user_router
from app.routes.auth import router as auth_router
from app.routes.alert import router as alert_router
from app.routes.matches import router as match_router
from app.routes.chat import router as chat_router
from app.routes.cricket import router as cricket_router

app = FastAPI(title=settings.APP_NAME)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later change to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(health_router)
app.include_router(db_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(alert_router)
app.include_router(match_router)
app.include_router(chat_router)

# CricAPI live matches route

app.include_router(cricket_router)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Cucuber API is running"}