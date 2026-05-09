# Language Translator Website

This project now supports a **free single-deployment setup** on Vercel.

- **Frontend:** Next.js + React + TypeScript + Tailwind CSS
- **Backend API (inside frontend):** Next.js Route Handler (`/api/translate`)
- **Translator engine:** `translate-google`

## Project Structure

- `frontend` - Complete app (UI + API route)

## Run Locally (Single App)

1. Open terminal in `frontend`
2. Install dependencies:
   - `npm install`
3. Start app:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## API Endpoint (inside Next.js app)

- `POST /api/translate`

Request body example:

```json
{
  "text": "Hello world",
  "source_language": "en",
  "target_language": "ur"
}
```

## Free Deployment on Vercel (Recommended)

1. Push repository to GitHub.
2. Go to Vercel and import this repository.
3. Set **Root Directory** to `frontend`.
4. Click **Deploy**.

No environment variables are required for this single-app version.

## Notes

- This setup is best for zero-cost/student usage.
- On free plans, first request can be slightly slower (cold start), which is normal.
