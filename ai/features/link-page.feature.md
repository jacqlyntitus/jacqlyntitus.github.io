# Feature Spec: Link Page

Read `./ai/ai-spec.md` first. This spec covers Feature 5 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Replace the Links placeholder with the real page: a set of curated external resources, each shown as a card with an image, a title, a short description, and a link that opens in a new tab.

## 2. Requirements Covered (FSD: Link Page)

1. Each link is displayed as a card.
2. Each entry includes an image (thumbnail/preview).
3. Each entry includes a title/name.
4. Each entry includes a short description of one to three sentences.
5. Each entry includes a clickable URL that opens in a new tab.
6. At least 3 links are displayed.
7. At least two AI-generated images on the page (the FSD heading says two, a bullet says one; this page uses three, one per card).
8. Appropriate alt text on every image.

## 3. Files

- `src/pages/Links.jsx` + `Links.css` — replace the placeholder. Default export. Keep the existing file name for the Links route as it is already wired in `App.jsx`.
- `src/components/LinkCard.jsx` + `LinkCard.css` — reusable card showing an image, title, description, and link. Named export.
- `src/data/links.js` — exports a `links` array. Each item: `{ name, url, description, image, imageAlt }`.
- `src/assets/link-react.png`, `src/assets/link-w3schools.png`, `src/assets/link-techworld.png` — AI-generated card images. Transparent PNGs. Already exist. Do not modify.

Do not modify `ai/ai-assets.md`. No other files change.

## 4. Content (use exactly)

Page heading (the page's only `<h1>`): `Links`

Intro line under the heading: `Resources I use while learning and building.`

`links`

Entry 1
- name: `React Documentation`
- url: `https://react.dev/`
- description: `The official React docs, where I look up hooks, component patterns, and how state and effects actually behave. The interactive examples make it easy to check something before writing it into a project.`
- image: imported from `src/assets/link-react.png`
- imageAlt: `AI-generated illustration of a glowing purple ring with a gold leaf`

Entry 2
- name: `W3Schools`
- url: `https://www.w3schools.com/`
- description: `A quick-reference site I return to for HTML, CSS, and JavaScript syntax. The runnable examples make it easy to test something in seconds without setting up a project.`
- image: imported from `src/assets/link-w3schools.png`
- imageAlt: `AI-generated illustration of three glowing orange lines beside a gold leaf`

Entry 3
- name: `Tech World with Nana`
- url: `https://www.youtube.com/@techworldwithnana`
- description: `Nana Janashia's channel breaks down DevOps and cloud topics like Docker, Kubernetes, and CI/CD pipelines into clear, beginner-friendly tutorials. It's where I go to understand the deployment side of development.`
- image: imported from `src/assets/link-techworld.png`
- imageAlt: `AI-generated illustration of a glowing purple triangle outline around a gold leaf`

## 5. Page Structure

- `<h1>Links</h1>` followed by the intro line.
- One `<section>` containing the cards, rendered from the `links` array in order.
- Each `LinkCard` shows, top to bottom: the image, the name as the card's heading, the description, and a visible link.
- The link uses `target="_blank"` and `rel="noopener noreferrer"`, matching the footer's existing external links.
- The whole card is clickable via the link, or the link sits as a labelled element inside the card. Either is acceptable, but a visible clickable element is required.

## 6. Styling

- Compact, matching the Portfolio page: `--space-sm` inside cards, `--space-md` between blocks.
- Cards: `--color-surface-alt` background, `--radius-lg` corners, accent border or glow on hover and focus.
- Card images: fixed height of 160px, `object-fit: contain`, centered. The images are transparent PNGs, so the card background shows through; do not add a separate background behind them.
- Cards sit three across on desktop, one per row at ≤ 768px.
- Colors only via custom properties from `src/styles/theme.css`. No hardcoded color values.
- No horizontal scrolling at 375px.

## 7. Constraints

- JavaScript only, never TypeScript.
- No new dependencies; icons, if any, from lucide-react.
- Content comes from `src/data/links.js` and the text above; nothing is fetched.
- Do not change Header, Footer, Layout, BottomNav, Home, Portfolio, or routing.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Page at `/links` | Click Links in the nav; page renders |
| 2 | 3 link cards | All three entries render as cards |
| 3 | Each card complete | Image, name, description, and visible link on each |
| 4 | Opens in new tab | Clicking a link opens a new tab; original page stays |
| 5 | Alt text | Every image has meaningful `alt` |
| 6 | Responsive | At 375px: single column, no horizontal scroll |
| 7 | No hardcoded colors | Search `Links.css` and `LinkCard.css` for `#`: none |
| 8 | Build passes | `npm run build` succeeds |

## 9. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, the code is committed on `feature/link-page`, and the branch is merged into `dev`.