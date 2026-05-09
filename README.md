# Language Translator Website

This project contains:

- **Frontend:** Next.js + React + TypeScript + Tailwind CSS
- **Backend:** Python + FastAPI

## Project Structure

- `frontend` - Translator web UI
- `backend` - Translation API

## 1) Run Backend (Python)

1. Open terminal in `backend`
2. Create virtual environment:
   - Windows PowerShell: `python -m venv .venv`
3. Activate virtual environment:
   - Windows PowerShell: `.venv\Scripts\Activate.ps1`
4. Install dependencies:
   - `pip install -r requirements.txt`
5. Start backend:
   - `uvicorn main:app --reload --port 8000`

Backend API URL: `http://localhost:8000`

## 2) Run Frontend (Next.js)

1. Open terminal in `frontend`
2. Install dependencies:
   - `npm install`
3. Copy environment file:
   - `cp .env.local.example .env.local`
   - On Windows PowerShell you can use:
     `Copy-Item .env.local.example .env.local`
4. Start frontend:
   - `npm run dev`

Frontend URL: `http://localhost:3000`

## 3) Use the App

1. Type text in the left textarea.
2. Choose source and target languages.
3. Click **Translate**.

## Backend Endpoints

- `GET /health` - Health check
- `POST /translate` - Translate text

Request body example:

```json
{
  "text": "Hello world",
  "source_language": "en",
  "target_language": "ur"
}
```
