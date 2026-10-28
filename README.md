# Live Bench

An ESP32 in a living room publishes temperature, light and presence over MQTT; a FastAPI backend stores it; a Next.js site shows it live.

That Next.js site is also my portfolio -> [https://saikham.vercel.app](https://saikham.vercel.app)

## Status

| Tier      | State                                                        |
|-----------|--------------------------------------------------------------|
| Web       | Deployed on Vercel, running on mock data                     |
| Firmware  | Planned                                                      |
| Backend   | Planned                                                      |

## Repository layout

| Folder      | What's in it                                               |
|-------------|------------------------------------------------------------|
| `web/`      | Next.js (App Router, TypeScript) portfolio site and live widget |
| `firmware/` | ESP32 code (PlatformIO, C++)                               |
| `backend/`  | FastAPI, MQTT subscriber, TimescaleDB                      |
| `docs/`     | [API contract](docs/api-contract.md) shared by all three tiers |

Design decisions and their reasons: [DECISIONS.md](DECISIONS.md)

## Run the website locally

```bash
cd web
cp .env.example .env.local
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in the browser.