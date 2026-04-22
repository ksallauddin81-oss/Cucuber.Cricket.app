from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Cucuber API"

    MONGO_URL: str
    SECRET_KEY: str
    ALGORITHM: str

    CRICKET_API_KEY: str
    CRICKET_BASE_URL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()