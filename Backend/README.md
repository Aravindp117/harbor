# Harbor Backend

Backend API for Harbor. Fastify server with three subsystems: Hazard Intelligence, Risk Scoring, and AI/News/Aid.

## Setup

```bash
npm install
cp .env.example .env
# Fill in GEMINI_API_KEY and FEATHERLESS_API_KEY at minimum
npm run dev
```

Server runs on `http://localhost:3001`. Swagger docs at `http://localhost:3001/api/docs`.

## API Keys

| Key | Source | Required |
|-----|--------|----------|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | Yes |
| `FEATHERLESS_API_KEY` | [Featherless.ai](https://featherless.ai) | Yes |
| `FIRMS_API_KEY` | [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/api/area/) | Yes |
| `GOOGLE_PLACES_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/) | No (mock fallback) |

Free data (no key): USGS, NASA EONET, Open-Meteo, GDELT.

## Endpoints

All return JSON under `/api`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/home/carousel` | Home page carousel items |
| GET | `/api/hazards/markers` | Hazard markers by bounding box |
| GET | `/api/hazards/hotspots` | Top 5 global hotspots |
| GET | `/api/risk/score` | Risk score for a location |
| GET | `/api/risk/compare` | Compare risk between two locations |
| GET | `/api/weather` | Current or forecast weather |
| GET | `/api/news/global` | Global disaster news feed |
| GET | `/api/news/local` | Local news near coordinates |
| GET | `/api/aid/nearby` | Nearby shelters and resources |
| GET | `/api/aid/hub` | Curated global aid organizations |
| POST | `/api/chat` | AI chat with map context |

## Project Structure

```
Backend/
├── shared/          # Types, schemas, utils shared across subsystems
├── src/
│   ├── server.ts    # Fastify bootstrap
│   ├── gateway/     # Route wiring
│   ├── subsystemA/  # Hazard data (USGS, FIRMS, EONET)
│   ├── subsystemB/  # Risk scoring + weather
│   └── subsystemC/  # AI chat, news, aid
└── tests/
```
