# Live Bench

An ESP32 in a living room publishes temperature, light and presence over MQTT; a FastAPI backend stores it; a Next.js site shows it live.

That Next.js site is also my portfolio -> [https://saikham.vercel.app](https://saikham.vercel.app)

## Status

| Tier      | State                                                        |
|-----------|--------------------------------------------------------------|
| Web       | Deployed on Vercel, running on mock data                     |
| Firmware  | Planned                                                      |
| Backend   | Local MQTT broker + fake device                              |

## Repository layout

| Folder      | What's in it                                                    |
|-------------|-----------------------------------------------------------------|
| `web/`      | Next.js (App Router, TypeScript) portfolio site and live widget |
| `firmware/` | ESP32 code (PlatformIO, C++)                                    |
| `backend/`  | FastAPI, MQTT subscriber, TimescaleDB                           |
| `docs/`     | [API contract](docs/api-contract.md) shared by all three tiers  |
| `infra/`    | Config for local services started by `compose.yaml` (Mosquitto) |

Design decisions and their reasons: [DECISIONS.md](DECISIONS.md)

## Run the website locally

```bash
cd web
cp .env.example .env.local
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in the browser.

## Run the MQTT broker and fake device locally

Needs Docker Desktop and Python 3.10+.

```bash
docker compose up -d                 # from the repo root: starts Mosquitto on 127.0.0.1:1883

cd backend
python -m venv .venv
source .venv/Scripts/activate        # Git Bash on Windows (macOS/Linux: .venv/bin/activate)
pip install -r requirements-dev.txt
python -m pytest                     # the fake device's payloads match the API contract
python tools/fake_device.py --interval 5
```

Watch the messages in a second terminal:

```bash
docker compose exec mosquitto mosquitto_sub -t 'devices/#' -v
```