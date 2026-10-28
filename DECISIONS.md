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