# AI Specification — Personal Portfolio

## 1. Project Identity

**Project Name:** jacqlyntitus.github.io

**Short Description:** A personal portfolio website presenting Jacqi Titus as a full-stack developer, including skills, resume, curated links, a contact form backed by Supabase, and a private admin back office for reading and deleting submitted messages.

**Project Type:** Static website — React (Vite) single-page application deployed to GitHub Pages, with Supabase as the only backend service.

---

## 2. Goal and Scope

### Goal
Deliver a publicly accessible, responsive portfolio at `https://jacqlyntitus.github.io` that presents the developer's professional identity and allows visitors to make contact, with an authenticated admin view for managing those messages.

### In Scope (Build Now)
- Persistent layout: header with logo and navigation, footer, main content region
- Home page: introduction, technical skills, soft skills
- Portfolio page: education, work experience, projects, downloadable PDF resume
- Link page: at least three curated external links as cards
- Contact page: validated form writing to Supabase
- Login page: secret route, Supabase email/password authentication
- Back office: authenticated message table with view modal, delete, and logout
- Responsive behavior: horizontal top navigation above 768px, bottom icon navigation at 768px and below
- AI-generated imagery on Home, Portfolio, and Link pages, plus an AI-generated logo

### Out of Scope (Do NOT Build)
- Any custom backend server, API server, or serverless functions
- User registration, password reset, or any account management UI
- Sending email or messages from within the application
- Server-side rendering, SEO tooling, analytics, or tracking
- State management libraries (Redux, Zustand, etc.) — React state is sufficient
- Testing frameworks and test files — not required by this module
- Blog, comments, search, pagination, or any feature not listed In Scope
- CMS integration or dynamic content editing

---

## 3. Users and Use Cases

- **Visitor (anonymous):** browses Home, Portfolio, Links, and Contact; downloads the PDF resume; submits a contact message. Cannot read any submitted messages.
- **Admin (authenticated):** signs in at the secret login route; reads, views, and deletes contact messages in the back office; signs out.

---

## 4. Feature Index

Each feature has its own specification in `./ai/features/`. Read this document together with the relevant feature file before implementing.

- `setup-deploy.feature.md`
- `header-footer.feature.md`
- `home-page.feature.md`
- `portfolio-page.feature.md`
- `link-page.feature.md`
- `contact-page.feature.md`
- `login-page.feature.md`
- `back-office.feature.md`

Extra miles (only after all required features are complete):
- `light-dark-mode.feature.md`
- `languages.feature.md`

---

## 5. Pages / Routes (Project Map)

Routing uses **HashRouter** from `react-router-dom`. The browser path always remains `https://jacqlyntitus.github.io/`; route changes appear after the `#`. This satisfies the requirement that the URL path never becomes `/home`, `/portfolio`, etc., while keeping deep links refreshable on GitHub Pages.

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public — default landing page |
| `/portfolio` | Portfolio | Public |
| `/links` | Links | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Secret — not in any navigation |
| `/backoffice` | Back Office | Authenticated only; redirects to `/login` when unauthenticated |

`/login` and `/backoffice` must never appear in the header, footer, or mobile bottom navigation.

---

## 6. Data and Models

**Supabase table: `public.messages`**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key, default `gen_random_uuid()` |
| `name` | text | not null |
| `email` | text | not null |
| `message` | text | not null |
| `created_at` | timestamptz | not null, default `now()` |

Row Level Security is enabled with three policies:
- `anon` and `authenticated` may INSERT
- `authenticated` may SELECT
- `authenticated` may DELETE

There is deliberately no anonymous SELECT policy. Visitors can send messages but cannot read them.

**Supabase Auth:** a single admin user exists, created manually in the Supabase dashboard. No registration flow exists in the application.

All other content (skills, projects, education, work history, links) is hardcoded in React components or local JSON/JS data files. There is no CMS and no dynamic content source.

---

## 7. Tech Stack and Tools

**Frontend:** React 19, Vite, JavaScript (no TypeScript)

**Routing:** `react-router-dom` — HashRouter

**Styling:** Plain CSS with CSS custom properties. No Tailwind, no Bootstrap, no CSS-in-JS, no component library.

**Icons:** `lucide-react`

**Backend:** None. Supabase (Backend-as-a-Service) is the only external service.

**Database/Auth:** Supabase — PostgreSQL with Row Level Security, Supabase Auth (email/password)

**Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

**Do not introduce any dependency not listed here without explicit approval.**

---

## 8. Repository Structure

```
jacqlyntitus.github.io/
├── .github/workflows/deploy.yml   # CI/CD to GitHub Pages
├── ai/
│   ├── ai-spec.md                 # this document
│   └── features/                  # one spec per feature
├── docs/                          # elevator pitch scripts and feedback
├── LeetCode-Challenges/           # challenge screenshots
├── public/
│   └── resume.pdf                 # downloadable CV
├── src/
│   ├── assets/                    # AI-generated images and logo
│   ├── components/                # reusable components (Header, Footer, Layout, ...)
│   ├── data/                      # static content arrays (skills, projects, links)
│   ├── lib/
│   │   └── supabaseClient.js      # configured Supabase client
│   ├── pages/                     # one component per route
│   ├── styles/                    # global CSS and design tokens
│   ├── App.jsx                    # router and route definitions
│   └── main.jsx                   # entry point
├── .env                           # never committed
├── CONCEPTS.md
├── README.md
└── vite.config.js                 # base: '/'
```

Page components live in `src/pages/`. Shared components live in `src/components/`. Do not create files outside this structure.

---

## 9. Design System

The visual direction is a dark, forest-toned palette drawn from high-fantasy woodland settings, combined with Y2K and retro-futuristic geometry. All theme colors are defined once as CSS custom properties in `src/styles/theme.css` so they can be retuned in a single place.

```css
:root {
  /* Base — deep forest */
  --color-bg:            #0d1410;
  --color-surface:       #16211b;
  --color-surface-alt:   #1e2d25;
  --color-border:        #2e4237;

  /* Text */
  --color-text:          #e8e4d4;
  --color-text-muted:    #a3b0a3;

  /* Woodland accents */
  --color-moss:          #7f9c6a;
  --color-mallorn:       #e0b64a;
  --color-silver:        #cfd6cd;

  /* Retro-futuristic accents */
  --color-electric:      #a855f7;
  --color-ember:         #ff6a1f;

  /* Shape language */
  --radius-pill:  999px;
  --radius-lg:    24px;
  --radius-md:    14px;

  /* Spacing scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
}
```

**Shape and layout language:** pill-shaped buttons and navigation, generously rounded cards, capsule containers, subtle glow or gradient edges using the electric and ember accents, and clear horizontal section dividers. Favor bold geometric blocks over thin minimal lines.

**Rules:**
- Never hardcode a color value in a component or page stylesheet. Always reference a custom property.
- Accent colors (`--color-electric`, `--color-ember`) are for emphasis: hover states, active navigation, focus rings, section accents. They are not background colors for large areas.
- Every page must be legible and fully usable with no horizontal scrolling at 375px width.

**Content restriction:** the palette and mood are inspired by fantasy woodland settings, but no copyrighted names, characters, place names, quotations, or recognizable designs from any franchise may appear in UI copy, alt text, filenames, or generated imagery.

**AI-generated asset documentation:** every AI-generated image and the logo must be recorded in `./ai/ai-assets.md` with the filename, the AI tool used, and the prompt. Add the entry in the same commit as the image.
---

## 10. Coding Standards and Conventions

- Function components with hooks only. No class components.
- One component per file. Component files use PascalCase (`Header.jsx`); other files use camelCase.
- Named exports for components; default export only for page components.
- Use strict equality (`===` / `!==`) everywhere.
- Prefer native browser APIs over libraries.
- Each component imports its own CSS file (`Header.jsx` imports `Header.css` from the same folder).
- Keep components small and readable. Junior-friendly code over clever code.
- All images require meaningful `alt` text.
- All form inputs require a visible label or placeholder.
- Handle Supabase errors explicitly — never leave a failed request silent.
- Check `isSupabaseConfigured` from `src/lib/supabaseClient.js` before using the client, and render a graceful fallback when it is false.

---

## 11. Rules for the AI

- Read this document in full before implementing any feature.
- Implement only what the active feature specification describes. Do not add adjacent features, polish, or improvements that were not requested.
- Do not modify files belonging to other features unless the feature spec says to.
- Do not install any package not listed in Tech Stack.
- Do not refactor working code that is outside the current feature's scope.
- Never hardcode Supabase URLs or keys — always read from `import.meta.env`.
- Never write anything that would require a server.
- Explain changes briefly after implementing.

---

## 12. How to Run and Test

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build into dist/
npm run preview      # preview the production build locally
```

Environment variables (in `.env`, never committed; mirrored as GitHub repository secrets):

```
VITE_SUPABASE_URL=<Supabase project URL>
VITE_SUPABASE_ANON_KEY=<Supabase publishable/anon key>
```

Deployment is automatic: any push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, `npm run build`, and publishes `dist/` to GitHub Pages.

---

## 13. Global Definition of Done

A feature is complete when:

- Every acceptance criterion in its feature specification is met
- The application builds with `npm run build` and produces no console errors at runtime
- The feature is responsive: horizontal top navigation above 768px, bottom icon navigation at 768px and below, no horizontal scrolling at 375px
- All colors reference CSS custom properties; no hardcoded hex values in components
- All images have meaningful `alt` text
- Supabase errors are handled and surfaced to the user
- No secrets appear anywhere in committed code
- Code has been read and understood line by line
- Work is committed on its own `feature/*` branch and merged into `dev`

The project is complete when all eight required features are merged into `dev`, `dev` is merged into `main`, the live site at `https://jacqlyntitus.github.io` reflects the final state, and all documentation deliverables (`README.md`, `CONCEPTS.md`, pitch scripts, LeetCode screenshots) are present.