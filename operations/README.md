Ops Hub (Multi-Project) – Starter

Purpose
- Centralize light-weight tooling (flags, feedback widget, webhook inbox, cancel flow) for every site/app in this folder.
- Keep infra cheap and simple: Cloudflare Pages/Workers + KV/R2 later. This repo contains a local-first starter you can deploy when ready.

Layout
- ops/projects.sample.yaml – declare each project (name, path, domain, Slack channel, etc.). Copy to projects.yaml and edit.
- ops/snippets/ – ready-to-drop embeds for flags and feedback.
- ops/hub-worker/ – minimal Cloudflare Worker with two endpoints wired (flags + feedback) so you can test end-to-end locally.

What’s implemented now
- GET /flags/:project.json – returns static flags (per projects.yaml) to unblock client usage.
- POST /feedback – accepts JSON { project, page, message, email? } and logs to console (swap to Slack/Email later).
- GET /embed/feedback.js – tiny embeddable widget that posts to /feedback.

Quick Start (local dev)
1) Create your project manifest
   - Copy ops/projects.sample.yaml to ops/projects.yaml and edit.

2) Run the Worker locally
   - Requires Node 18+, pnpm/npm, Cloudflare wrangler installed (npm i -g wrangler)
   - cd ops/hub-worker
   - npm install
   - npm run dev
   - Visit http://127.0.0.1:8787/flags/<your-project>.json

3) Embed feedback widget in any site
   - Add this to your site’s HTML (layout or footer):
     <script async src="http://127.0.0.1:8787/embed/feedback.js" data-project="your-project"></script>
   - This injects a fixed-feedback button and posts to the local Worker.

4) Fetch flags in your app (example: Next.js server or client)
   - Server (getServerSideProps or route handler):
     const res = await fetch("http://127.0.0.1:8787/flags/your-project.json");
     const flags = await res.json();
   - Client (edge/CDN safe): same fetch on mount with cache: "no-store".

Deploying later
- Cloudflare
  - Add a KV namespace (FLAGS) and optional R2 bucket if you want persistence.
  - Update wrangler.toml with your account_id and bindings.
  - npm run deploy from ops/hub-worker.

Roadmap (modules you can add next)
- Webhook inbox + replay: /hook/:project, /replay endpoints; store payloads in R2.
- Cancel/retention flow: /cancel – Stripe client-only first, secrets via Workers env.
- Visual regression: a simple Playwright script + cron that screenshots configured URLs and posts diffs to Slack.
- Slack digest: channel rules + daily DM; keep it rules-first, no heavy AI required.

Notes
- Keep secrets out of this repo; use Workers secrets (wrangler secret put ...) or a .env.local that is gitignored.
- If your projects live outside this folder, you can still use this hub as a separate repo and reference domains.

