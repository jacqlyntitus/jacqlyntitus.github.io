# Jacqlyn Titus — Developer Portfolio

A personal portfolio website for Jacqlyn Titus, a full-stack developer moving into software after twelve years in critical-care healthcare.

**What it does:** The site introduces Jacqlyn to recruiters, hiring managers and collaborators. Visitors can:

- read a short introduction and see her technical and soft skills (**Home**)
- see her education, work experience and past projects, and download her resume as a PDF (**Portfolio**)
- find her LinkedIn and GitHub profiles and a reference site she uses (**Links**)
- send her a message through a contact form (**Contact**)

Messages from the contact form are saved to a database. Jacqlyn signs in on a private **Login** page to reach a **Back Office**, where she can read and delete those messages.

**Who it's for:** people deciding whether to interview, hire or work with Jacqlyn, and Jacqlyn herself, who manages incoming messages.

**What problem it solves:** it puts her background, skills, projects and resume in one place, and gives visitors a way to reach her without needing an email client.

The site is published on GitHub Pages at the address in this repository's name: `https://jacqlyntitus.github.io`.

---

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, React Router 7 (`HashRouter`), JavaScript (JSX), plain CSS with CSS custom properties, lucide-react icons |
| Build tool | Vite 8 with `@vitejs/plugin-react` |
| Backend | No custom backend server. The app talks directly to Supabase from the browser using `@supabase/supabase-js`. |
| Database | Supabase (hosted Postgres), one `messages` table |
| Authentication | Supabase Auth (email and password) for the Back Office |
| DevOps / hosting | GitHub Actions workflow that builds on every push to `main` and deploys to GitHub Pages (Node 20) |
| Linting | ESLint 10 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |
| Testing | None. The repo has no test framework or test files. |

---

## Project Structure

```
jacqlyntitus.github.io/
├── .github/workflows/
│   └── deploy.yml          # Build and deploy to GitHub Pages on push to main
├── public/
│   ├── jt-logo.png         # Favicon
│   └── resume.pdf          # Served for the "Download Resume" button
├── src/
│   ├── main.jsx            # Entry point: mounts <App /> inside HashRouter
│   ├── App.jsx             # Route table
│   ├── assets/             # Logo, banner images, project screenshots
│   ├── components/         # Header, Footer, BottomNav, Layout, Banner,
│   │                       # SkillCard, ProjectCard, LinkCard, MessageModal
│   ├── data/               # Page content as JS arrays
│   │   ├── skills.js       #   technical and soft skills (Home)
│   │   ├── portfolio.js    #   education, work, projects (Portfolio)
│   │   └── links.js        #   external links (Links)
│   ├── lib/
│   │   └── supabaseClient.js  # Creates the Supabase client from env vars
│   ├── pages/              # Home, Portfolio, Links, Contact, Login, BackOffice
│   └── styles/
│       ├── theme.css       # Color, font and spacing variables
│       └── global.css      # Base element styles
├── ai/                     # AI planning docs: spec, asset notes, per-page feature specs
├── docs/                   # Pitch scripts and pitch feedback
├── LeetCode-Challenges/    # Screenshots of completed LeetCode problems
├── CONCEPTS.md
├── submission-summary.md
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

Each component and page has its own CSS file next to it (for example `Header.jsx` and `Header.css`).

### Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | |
| `/portfolio` | Portfolio | |
| `/links` | Links | |
| `/contact` | Contact | Writes to Supabase |
| `/login` | Login | Not linked in the navigation |
| `/backoffice` | Back Office | Sends you to `/login` if you are not signed in |
| any other path | | Sends you to `/` |

Because the app uses `HashRouter`, URLs in the browser look like `/#/portfolio`.

---

## Installation / Setup

**Prerequisites:** Node.js (CI uses Node 20) and npm. You need a Supabase project only if you want the contact form, login and Back Office to work.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/jacqlyntitus/jacqlyntitus.github.io.git
   cd jacqlyntitus.github.io
   npm install
   ```

2. Create a `.env` file in the project root with the two variables listed under [Environment Variables](#environment-variables).
   If you skip this step, the site still runs. The contact form and login are disabled and show an "unavailable" message.

3. Start the development server:

   ```bash
   npm run dev
   ```

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally |
| `npm run lint` | Run ESLint |

### Deployment

Pushing to `main` (or running the workflow by hand from the Actions tab) runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml). It installs dependencies with `npm ci`, builds with the Supabase values taken from repository secrets, and publishes `dist/` to GitHub Pages.
For this to work, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as repository secrets and set GitHub Pages to deploy from GitHub Actions.

---

## Environment Variables

| Name | Used in | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `src/lib/supabaseClient.js`, deploy workflow | URL of the Supabase project |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabaseClient.js`, deploy workflow | Supabase public (anon) key |

Locally these go in `.env`, which is git-ignored. Copy [.env.example](.env.example) to `.env` and fill in the values. In CI they come from GitHub repository secrets.

Vite includes any `VITE_`-prefixed variable in the browser bundle, so only put values here that are safe to make public.

---

## API Documentation

This project does not have its own API. There is no server and there are no endpoints.

The frontend calls Supabase directly through `@supabase/supabase-js`. For reference, these are the calls it makes:

### `messages` table

The code uses these columns: `id`, `name`, `email`, `message`, `created_at`. The table definition and access rules are managed in the Supabase dashboard and are not stored in this repo.

| Operation | Where | Call |
| --- | --- | --- |
| Create a message | Contact page | `supabase.from('messages').insert({ name, email, message })` |
| List messages, newest first | Back Office | `supabase.from('messages').select('*').order('created_at', { ascending: false })` |
| Delete a message | Back Office | `supabase.from('messages').delete().eq('id', id)` |

### Authentication

| Operation | Where | Call |
| --- | --- | --- |
| Sign in | Login | `supabase.auth.signInWithPassword({ email, password })` |
| Check current session | Login, Back Office | `supabase.auth.getSession()` |
| React to sign-out or session end | Back Office | `supabase.auth.onAuthStateChange(...)` |
| Sign out | Back Office | `supabase.auth.signOut()` |

The app has no sign-up page. The Back Office account is created in Supabase.

---

## Author

Jacqlyn Titus — Full-Stack Developer | Career Changer from Critical-Care Medicine  
https://www.linkedin.com/in/jacqlyn-titus/

LinkedIn updates for this module: added a Skills section (JavaScript, React, React
Native, Node.js, Express, MongoDB, SQL); updated the headline to match my resume;
rewrote the About section to reflect the completed 32-week Codeboxx program and name
my stack; added a Featured link to this portfolio site.
