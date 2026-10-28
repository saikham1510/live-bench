# web - portfolio site and live widget

Next.js App Router + TypeScript. Deployed to Vercel from `main` (Root Directory: `web/`).

## Scripts

| Command      | Description                       |
|--------------|-----------------------------------|
| `pnpm dev`   | Dev server on localhost:3000      |
| `pnpm build` | Production build (same as Vercel) |
| `pnpm start` | Serve the production build        |

## Environment variables

| Name                       | Purpose                            |
|----------------------------|------------------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Telemetry API base URL, called from the browser. Public by design. |

Copy `.env.example` to `.env.local` for local development.
On Vercel, it is set in Project Settings > Environment Variables.

## Routes

| Route              | Notes                                         |
|--------------------|-----------------------------------------------|
| `/`                | Home: hero, work, about, skills, contact      |
| `/projects/[slug]` | Case studies; only shipped, featured projects |
| `/lab`             | Widget states on mock data (noindex)          |

