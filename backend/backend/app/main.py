from fastapi import FastAPI
from app.config.settings import settings
from app.routes.health import router as health_router
from app.routes.db_test import router as db_router
from app.routes.user import router as user_router
from app.routes.auth import router as auth_router
from app.routes.alert import router as alert_router
from app.routes.match import router as match_router
from app.routes.chat import router as chat_router

app = FastAPI(title=settings.APP_NAME)

app.include_router(health_router)
app.include_router(db_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(alert_router)
app.include_router(match_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "API is running"}