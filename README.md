# Harbor

Global disaster intelligence platform — understand disasters, find help faster.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js + Fastify (3 subsystems: Hazards, Risk, AI/News/Aid)
- **Map**: Mapbox GL (3D globe with auto-rotate)
- **AI**: Google Gemini for chat, Featherless for preprocessing/fallback

## Getting Started

```sh
# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

The frontend runs on `http://localhost:8080`.

For the backend, see [Backend/README.md](Backend/README.md).

## Project Structure

- `src/pages/` — Page components (Home, DisasterMap, News, Trends, AidResources, About)
- `src/components/` — Reusable UI components
- `src/lib/` — API clients, utilities
- `Backend/` — Fastify API server (3 subsystems)

## Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_PROJECT_ID=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...
VITE_MAPBOX_TOKEN=...
VITE_GEMINI_API_KEY=...
```

## License

MIT
