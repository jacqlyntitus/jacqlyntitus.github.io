# Feature Spec: Project Layout (Header & Footer)

Read `./ai/ai-spec.md` first. This spec covers Feature 2 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Create the shared layout every page renders inside: a sticky header with the personal logo and navigation, a footer with contact information and copyright, responsive behavior for desktop and mobile, and HashRouter routing with placeholder pages.

## 2. Requirements Covered (FSD: Project Layout)

Layout
1. A main Layout component wraps all page content between the header and footer.
2. A Navbar (Header) component renders at the top of every page.
3. A Footer component renders at the bottom of every page.

Header
4. Visible at the top of the viewport.
5. Sticky, stays visible while scrolling.
6. Contains navigation links to all main pages.
7. Consistent background and styling across all pages.

Footer
8. Visible at the bottom of page content, on every page.
9. Includes contact information (email and social links).
10. Includes a copyright notice.

Personal logo
11. Logo image visible in the header.
12. Logo was generated with an AI tool (logged in `./ai/ai-assets.md`).
13. Clicking the logo navigates to the Home page.
14. Logo has appropriate alt text.

Responsive
15. Desktop (> 768px): navigation links displayed horizontally at the top.
16. Mobile (≤ 768px): navigation links become icons displayed at the bottom of the screen.
17. Logo scales appropriately with no overflow.
18. Text readable without horizontal scrolling on mobile.
19. Images scale on smaller screens.
20. Sections stack vertically on narrow viewports.
21. No content overflows the viewport.

Carried from Setup & Deploy
22. URL path stays `https://jacqlyntitus.github.io/` on every page; only the `#` fragment changes.

## 3. Routing

- Wrap the app in `HashRouter` in `src/main.jsx`.
- Routes, all rendered inside the Layout:
  - `/` → Home
  - `/portfolio` → Portfolio
  - `/links` → Links
  - `/contact` → Contact
- Each page is a minimal placeholder component in `src/pages/` (`Home.jsx`, `Portfolio.jsx`, `Links.jsx`, `Contact.jsx`) showing only a page heading. Later features replace their contents.
- Do NOT add `/login` or `/backoffice` routes in this feature. They are added in later features and must never appear in the header, footer, or mobile bottom nav.
- Unknown routes redirect to `/`.

## 4. Components

- `src/components/Layout.jsx` — renders `Navbar`, then a `<main>` containing the routed page (`<Outlet />`), then `Footer`.
- `src/components/Navbar.jsx` — the header.
- `src/components/Footer.jsx` — the footer.
- `src/App.jsx` — defines the routes above; remove all default Vite demo content.
- Styles use CSS custom properties from `src/styles/theme.css` (create it if missing). Component-specific styles go in plain CSS files. No Tailwind, no component library.

## 5. Header (Navbar)

- Sticky to the top of the viewport (`position: sticky; top: 0`) with a solid themed background and a z-index above page content.
- Left: logo imported from `src/assets/jt-logo.png`, wrapped in a link to `/`.
  - Alt text: `Jacqi Titus JT monogram logo`.
  - Height about 48px on desktop, about 40px on mobile; width auto; never overflows.
- Right (desktop only): nav links in this order: Home, Portfolio, Links, Contact.
  - Use React Router `NavLink` so the current page is visually highlighted.
  - Y2K shape language: links sit inside a capsule-shaped nav container; the active link is a filled pill.

## 6. Mobile Bottom Navigation (≤ 768px)

- The desktop nav links are hidden.
- A fixed bottom navigation bar appears, containing the same four destinations as icon links (lucide-react):
  - Home → `Home`
  - Portfolio → `Briefcase`
  - Links → `Link`
  - Contact → `Mail`
- Each icon link has an `aria-label` with the page name. The active page's icon is highlighted.
- The logo stays in the sticky header at the top.
- Page content and the footer get enough bottom padding that the fixed bar never covers them.

## 7. Footer

- Appears after the page content on every page.
- Contact information:
  - Email: `jacqlyntitus@gmail.com` as a `mailto:` link.
  - LinkedIn: `https://www.linkedin.com/in/jacqlyn-titus/`
  - GitHub: `https://github.com/jacqlyntitus`
  - External links open in a new tab with `rel="noopener noreferrer"`.
- Copyright notice: `© <current year> Jacqi Titus. All rights reserved.` The year is computed with JavaScript, not hard-coded.
- Never contains links to `/login` or `/backoffice`.

## 8. Global Responsive Rules

- Global styles include `box-sizing: border-box`, `img { max-width: 100%; height: auto; }`, and no fixed widths that exceed the viewport.
- The page body never scrolls horizontally at any width down to 320px.
- Multi-column layouts stack vertically at ≤ 768px.

## 9. Cleanup

- Remove the default Vite demo markup from `App.jsx` and its default styles from `App.css` / `index.css`.
- Delete unused default demo assets: `src/assets/hero.png`, `src/assets/react.svg`, `public/vite.svg` (and remove any references to them, including the favicon link in `index.html`, which may temporarily have no favicon).

## 10. Constraints

- JavaScript only, plain CSS, lucide-react for icons.
- No new dependencies.
- Login and Back Office are never linked anywhere in public navigation.

## 11. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Layout wraps every page | Visit all four routes; header and footer appear on each |
| 2 | Header sticky | Scroll a long page; header stays visible |
| 3 | Nav links to all main pages | Home, Portfolio, Links, Contact present and working |
| 4 | Logo visible, links Home | Click logo from any page → lands on `/` |
| 5 | Logo alt text | Inspect `<img>`; alt text present |
| 6 | Logo logged as AI-generated | Entry exists in `./ai/ai-assets.md` |
| 7 | Footer contact info | Email, LinkedIn, GitHub links present and correct |
| 8 | Copyright notice | Shows current year and name |
| 9 | Desktop nav horizontal at top | At > 768px width, links are in a row in the header |
| 10 | Mobile nav icons at bottom | At ≤ 768px, text links hidden, icon bar fixed at bottom |
| 11 | No overflow on mobile | DevTools at 320px and 375px: no horizontal scroll |
| 12 | Nothing hidden behind bottom bar | Footer fully visible when scrolled to bottom on mobile |
| 13 | No login/backoffice links | Search header, footer, bottom nav: none present |
| 14 | URL stays at root | Navigating changes only `#/...`; pathname stays `/` |
| 15 | Unknown route | `#/anything` redirects to Home |
| 16 | Build passes | `npm run build` succeeds |

## 12. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, the code is committed on `feature/header-footer`, and the branch is merged into `dev`.