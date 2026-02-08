# Harbor

Real-time disaster tracking and safety platform.

## Tech Stack

- **Frontend**: React + TypeScript + Vite, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js + Fastify
- **Map**: Mapbox GL (3D globe)
- **AI**: Google Gemini

## Setup

```sh
npm install
npm run dev
```

Frontend runs on `http://localhost:8080`. Backend setup in [Backend/README.md](Backend/README.md).

## Environment Variables

Create a `.env` in the project root:

```
VITE_SUPABASE_PROJECT_ID=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...
VITE_MAPBOX_TOKEN=...
VITE_GEMINI_API_KEY=...
```
