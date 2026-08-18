# MyDost QA Dashboard

A local React dashboard for aq-agent's QA findings on the MyDost portal.
Currently a static snapshot (`src/data.js`) taken from the Notion "Dost Portal —
QA Dashboard" page on 2026-08-17. Update `src/data.js` by hand whenever you want
to refresh it, or see "Live Notion sync" below for an automated option.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial QA dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/mydost-qa-dashboard.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username, after creating an empty
repo called `mydost-qa-dashboard` on github.com first.

## Build for production (optional)

```bash
npm run build
npm run preview
```

Outputs static files to `dist/` — deployable to GitHub Pages, Netlify, Vercel,
or any static host, if you later want it live instead of localhost-only.

## Live Notion sync (optional, not set up yet)

To pull real-time data instead of editing `src/data.js` by hand, you'd add a
small Node script using the official `@notionhq/client` package and your own
Notion integration token, which reads the "Dost Portal — QA Dashboard" page
and regenerates `src/data.js` before each `npm run dev`. This requires:

1. Creating a Notion integration at https://www.notion.so/my-integrations
2. Sharing the QA Dashboard page with that integration
3. A script that fetches the page content and writes it to `src/data.js`

This isn't built yet — the current version is a manually-updated snapshot.
Ask if you want this wired up.
