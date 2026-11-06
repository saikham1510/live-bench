# Why Next.js and Tailwind for Front-end

## Lighting Fast Performance
- Next.js handles server-side rendering (SSR) and static generation out of the box.
- Tailwind CSS is a utility-first CSS framework that allows for rapid styling without writing custom CSS.
- These technologies together ensure that the front-end is optimized for speed and performance, leading to better user experience and SEO.

## Developer Experience
- Next.js provides a great developer experience with features like hot reloading, API routes, and built-in routing.
- Tailwind CSS allows developers to style components directly in the markup, reducing context switching and improving productivity.
- The combination of Next.js and Tailwind CSS leads to a more efficient development process, allowing developers to focus on building features rather than dealing with complex configurations.

## Rendering Strategy (Oct 2026)
- Pages (home, case studies, 404) are static server components. Content changes ship by redploying.
- Interactive pieces are small client components ("use client" as low in the tree as possible): WidgetDemo, TimeAgo, LiveWidgetContainer, CopyEmailButton.
- Live data is fetched in the browser, so pages stay static. Possible later: a server-side first reading with revalidate: 60 and a null fallback if the API is down at build time.
- API base URL comes from NEXT_PUBLIC_API_BASE_URL (public by design; it's called from the browser). Set it in Vercel before the first deploy.

## Hosting the website (Oct 2026)
- Vercel Hobby, project `saikham` -> https://saikham.vercel.app. Root Directory: `web`.
- Production deploys from `main`; every PR gets a preview deployment.
- `NEXT_PUBLIC_API_BASE_URL` = `https://api.saikham.invalid/v1` until the backend exists, so the widget fails cleanly instead of calling the visitor's localhost
- `/lab` ships to production: unlinked, noindex, labelled as mock data.
- Repo renamed `live-bench-project` → `live-bench` before anything linked to it.

## Styling foundations (Stage A · S1, Oct 2026)

- Tailwind v4, CSS-first: all tokens live in `web/app/globals.css`.
- Tokens are named by their job (canvas, surface, ink, muted, accent, line), not by colour, so dark mode only redefines values.
- The scaffold's dark-mode block was removed until we have a dark-mode design.
- Fonts: IBM Plex Sans (300–600) and IBM Plex Mono (400–500), self-hosted via next/font.
- Header: sticky; desktop nav from `lg` (1024px). Below that, a menu button (aria-expanded) opens a panel that closes on link tap and Esc. No focus trap: it's a panel, not a modal.
- `scroll-padding-top` keeps `/#section` targets clear of the sticky header.
- Name and links live in `web/content/site.ts`.
- Class names are always written in full (no `bg-${x}`)
- Deferred: underline "Work" as the current page on case-study pages.

## Home sections (Stage A · S2, Nov 2026)

- Interim hero: the bench photo with a caption saying live readings replace it in December. No fake numbers.
  In December the live widget swaps in for the `<figure>`; nothing else in the hero changes.
- On phones the hero buttons come before the photo (the wireframe's panel-first order was for live data).
- Signal path: one data list, shown as a `<details>` fold-out (closed) below `lg` and as four cards from `lg`.
- All home page copy lives in `web/content/home.ts`; components only do layout.
- Skills list only real skills I can do; tools get added once a project uses them.
- Contact ships without a form until the submit target is decided; email, copy button, LinkedIn, GitHub and resume cover it.
- About ships without a portrait until there's a real photo.
- Sections share `components/home/Section.tsx` (id, title, intro, tone) so spacing and headings match.