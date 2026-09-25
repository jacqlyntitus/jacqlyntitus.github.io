# Feature Spec: Setup & Deploy

Read `./ai/ai-spec.md` first. This spec covers Feature 1 of 8.

## 1. Purpose

Establish the React + Vite application and the automated deployment pipeline so that every push to `main` builds the app and publishes it to GitHub Pages at https://jacqlyntitus.github.io.

Status: implementation already exists. This spec documents the required state and how to verify it. No new application code is expected unless verification fails.

## 2. Requirements Covered (FSD: Setup & Deploy)

1. React + Vite app scaffolded with `npm create vite@latest jacqlyntitus.github.io`, framework React, variant JavaScript.
2. GitHub Actions workflow at `.github/workflows/deploy.yml`.
3. Workflow triggers on push to `main`.
4. Workflow steps: `npm ci`, `npm run build`, deploy `dist/`.
5. GitHub Pages source set to GitHub Actions deployment.
6. Required environment variables configured in the workflow.
7. `vite.config.js` sets `base: '/'`.
8. https://jacqlyntitus.github.io loads the React app.
9. URL path stays https://jacqlyntitus.github.io on all pages (no `/home`, `/portfolio`, etc.).

## 3. Inputs and Outputs

Inputs: source code on `main`; repository secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

Outputs: static build in `dist/`, deployed to GitHub Pages and served at https://jacqlyntitus.github.io.

## 4. Files Involved

- `vite.config.js` — must set `base: '/'`.
- `.github/workflows/deploy.yml` — build and deploy pipeline.
- `package.json` / `package-lock.json` — lockfile required for `npm ci`.
- `.gitignore` — must include `.env` and `.env.*`, with `!.env.example`.
- `src/lib/supabaseClient.js` — exports `supabase` and `isSupabaseConfigured`.

No components are created or modified by this feature.

## 5. Workflow Specification (`.github/workflows/deploy.yml`)

- Triggers: `push` to `main`; `workflow_dispatch` for manual reruns.
- Runner: `ubuntu-latest`. Node version: 20.
- Permissions sufficient for Pages deployment (`contents: read`, `pages: write`, `id-token: write`).
- Build job runs, in order: checkout, set up Node 20, `npm ci`, `npm run build`, upload `dist/` as the Pages artifact.
- The build step receives environment variables through an `env:` block:
  - `VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}`
  - `VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}`
- Deploy job depends on the build job and deploys the uploaded artifact to GitHub Pages.

## 6. Constraints

- Static site only; no backend server, no server-side rendering.
- All client-exposed env vars use the `VITE_` prefix.
- `.env` is never committed. Values reach production only through GitHub Actions secrets injected at build time.
- Only the Supabase publishable (anon) key is used. The `service_role` / secret key is never used or exposed.
- No credentials of any kind in the repository or in any spec file.
- Routing uses `HashRouter` (settled in `ai-spec.md`). The real URL path always remains `/`; routes live after the `#`. This satisfies requirement 9 and keeps deep links working on refresh, since GitHub Pages has no server-side routing.
- Branching: `feature/*` → `dev` → `main`. No direct commits to `main`. Only `main` deploys and only `main` is graded.

## 7. Supabase Prerequisites (outside this spec's implementation scope per FSD)

Completed manually; listed here so the checklist is fully traceable.

- Supabase project created.
- Supabase client configured in `src/lib/supabaseClient.js`.
- `messages` table: `id` uuid primary key, `name` text, `email` text, `message` text, `created_at` timestamptz default `now()`.
- RLS enabled. Policies: anon + authenticated may INSERT; authenticated may SELECT; authenticated may DELETE. No anonymous SELECT.
- Supabase Auth (email/password) enabled; admin user created manually in the Supabase dashboard.
- Env vars configured for local dev (`.env`) and deployment (repository secrets).
- Fallback behavior: `isSupabaseConfigured` is exported so features that use Supabase can show a clear message instead of crashing when env vars are missing. Each such feature spec defines its own fallback UI.
- `.env` listed in `.gitignore`.
- Secrets set under Settings > Secrets and variables > Actions with names exactly matching the workflow.
- Deploy workflow passes the `VITE_*` vars to the build step via `env:`.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | App is React + Vite, JavaScript | `package.json` lists `react` and `vite`; source files are `.jsx`/`.js` |
| 2 | Workflow at correct path | File exists at `.github/workflows/deploy.yml` |
| 3 | Triggers on push to `main` | `on: push: branches: [main]` present |
| 4 | Steps `npm ci`, `npm run build`, deploy `dist/` | All present in workflow, in that order |
| 5 | Pages source is GitHub Actions | Repo Settings > Pages > Source shows "GitHub Actions" |
| 6 | Env vars configured in workflow | `env:` block on build step maps both `VITE_*` secrets |
| 7 | `base: '/'` | Present in `vite.config.js` |
| 8 | Live site loads React app | https://jacqlyntitus.github.io renders; latest Actions run is green |
| 9 | URL path stays at root | Navigating between pages changes only the `#` fragment; pathname stays `/` (fully verifiable once routes exist in the Project Layout feature) |
| 10 | `.env` not tracked | `git ls-files .env` returns nothing; `git check-ignore .env` returns `.env` |
| 11 | Local build succeeds | `npm run build` completes and produces `dist/index.html` |

## 9. Definition of Done

All acceptance criteria pass, the spec is committed on `feature/setup-deploy`, and the branch is merged into `dev`.