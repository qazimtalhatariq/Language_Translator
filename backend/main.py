import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from deep_translator import GoogleTranslator


app = FastAPI(title="Language Translator API", version="1.0.0")


def get_allowed_origins() -> list[str]:
    raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    return origins if origins else ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    source_language: str = Field(default="auto")
    target_language: str = Field(..., min_length=2)


class TranslationResponse(BaseModel):
    translated_text: str
    source_language: str
    target_language: str


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/translate", response_model=TranslationResponse)
def translate_text(payload: TranslationRequest) -> TranslationResponse:
    try:
        translator = GoogleTranslator(
            source=payload.source_language, target=payload.target_language
        )
        translated = translator.translate(payload.text)

        return TranslationResponse(
            translated_text=translated,
            source_language=payload.source_language,
            target_language=payload.target_language,
        )
    except Exception as error:
        raise HTTPException(
            status_code=400, detail=f"Translation failed: {str(error)}"
        ) from error
