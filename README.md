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

## Proper Production Deployment (Recommended)

Use:

- **Frontend:** Vercel
- **Backend:** Render

This is the standard production setup for your current architecture.

### A) Deploy Backend on Render

1. Push this repository to GitHub.
2. In Render, click **New +** -> **Blueprint** (or **Web Service**).
3. Select this repository.
4. If using Blueprint, Render can read `render.yaml` automatically.
5. Set environment variable:
   - `ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app`
   - For multiple domains, separate by commas.
6. Deploy backend.
7. Copy backend URL (example: `https://language-translator-backend.onrender.com`).

### B) Deploy Frontend on Vercel

1. In Vercel, click **Add New Project** and import this same GitHub repository.
2. Set **Root Directory** to `frontend`.
3. Add environment variable:
   - `NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.onrender.com`
4. Deploy.
5. Copy frontend URL (example: `https://language-translator.vercel.app`).

### C) Final CORS Step

After frontend deploy is complete, update Render env var:

- `ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app`

Then redeploy backend once.

## Can this run as a single server on Vercel?

Not with the current FastAPI `uvicorn` backend as a long-running server.

- Current best setup: **2 services** (Vercel + Render)
- Single Vercel app would require moving backend logic to serverless functions/API routes.
