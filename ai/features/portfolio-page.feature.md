# Feature Spec: Portfolio Page

Read `./ai/ai-spec.md` first. This spec covers Feature 4 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Replace the Portfolio placeholder with the real page: education, work experience, projects, and a downloadable PDF resume, including two AI-generated images.

## 2. Requirements Covered (FSD: Portfolio Page)

Education section
1. At least one institution listed.
2. Each entry shows institution name, degree/program, and dates.
3. Reverse chronological order.

Work section
4. At least one work experience.
5. Each entry shows title/role, organization, dates, and description.
6. Description mentions responsibilities or achievements.
7. Reverse chronological order.

Project section
8. At least one project.
9. Each entry shows project name, tech, description, and image.
10. Description explains what the project is and its purpose.

Downloadable PDF
11. A downloadable PDF version of the resume.

Layout
12. At least 3 distinct sections.
13. Sections visually separated.

AI images
14. At least 2 AI-generated images on the page.
15. They complement the resume content (section banners).
16. Appropriate alt text.

## 3. Files

- `src/pages/Portfolio.jsx` + `Portfolio.css` — replace the placeholder. Default export.
- `src/components/ProjectCard.jsx` + `ProjectCard.css` — reusable card showing an image, project name, tech list, and description. Named export.
- `src/data/portfolio.js` — exports `education`, `work`, and `projects` arrays (content in §4, already in reverse chronological order; render in array order).
- `src/assets/portfolio-experience.png` — AI-generated banner for the Work Experience section. Already exists. Do not modify.
- `src/assets/portfolio-projects.png` — AI-generated banner for the Projects section. Already exists. Do not modify.
- `src/assets/codebloggs.png` — screenshot used as the CodeBloggs project image. Not AI-generated. Already exists. Do not modify.
- `src/assets/rocket-food-delivery.png` — screenshot used as the Rocket Food Delivery project image. Not AI-generated. Already exists. Do not modify.
- `public/resume.pdf` — the resume. Already exists. Do not modify.

Do not modify `ai/ai-assets.md`. No other files change.

## 4. Content (use exactly)

Page heading (the page's only `<h1>`): `Portfolio`

`education`
| institution | program | dates |
|---|---|---|
| Codeboxx | Full-Stack Developer Bootcamp | 2026 |
| St. Petersburg College | A.S., Respiratory Care | 2014 |
| Pasco-Hernando Community College | A.A. | 2009 |

`work`
| title | organization | dates |
|---|---|---|
| Registered Respiratory Therapist | Hospitals across the Tampa Bay area | 2015 – Present |

Description: `Deliver critical-care respiratory therapy across emergency, ICU, and floor units, making rapid, evidence-based decisions under pressure. Maintain precise, audit-ready documentation and interpret complex clinical data to adjust treatment in real time. Recognized for consistent, error-free work and serve as a go-to mentor for colleagues and new hires.`

`projects`

Entry 1
- name: `CodeBloggs`
- tech: `['React', 'Redux Toolkit', 'React Router', 'Node.js', 'Express', 'MongoDB (Mongoose)', 'bcrypt']`
- description: `A simple social blogging app where users register, log in, and share posts and comments. I built both the front end and the back end: a React client and a Node.js and Express REST API backed by MongoDB.`
- image: imported from `src/assets/codebloggs.png`
- imageAlt: `Screenshot of the CodeBloggs network page showing user profile cards`

Entry 2
- name: `Rocket Food Delivery`
- tech: `['React Native', 'Expo', 'Java', 'Spring Boot']`
- description: `A React Native and Expo mobile app with a Spring Boot backend, covering the customer ordering flow, courier delivery management, and account settings. I built the mobile app against the backend API.`
- image: imported from `src/assets/rocket-food-delivery.png`
- imageAlt: `Screenshot of the Rocket Food Delivery app showing a list of nearby restaurants`

## 5. Page Structure

Top of page (above the sections):
- `<h1>Portfolio</h1>`
- Resume download link styled as a pill button, with the lucide-react `Download` icon and the text `Download Resume (PDF)`.
  - `href`: `` `${import.meta.env.BASE_URL}resume.pdf` ``
  - `download` attribute value: `Jacqlyn-Titus-Resume.pdf`

Then three `<section>` elements, in this order:

1. Education
   - Heading `Education`.
   - One card per entry: institution (bold), program, dates.
2. Work Experience
   - Heading `Work Experience`.
   - `portfolio-experience.png` as a wide banner under the heading. Alt text: `AI-generated banner of a glowing purple line winding through gold leaves`.
   - One card per entry: title (bold), organization, dates, description.
3. Projects
   - Heading `Projects`.
   - `portfolio-projects.png` as a wide banner under the heading, styled the same as the Work Experience banner. Alt text: `AI-generated banner of a glowing orange line winding through gold leaves`.
   - One `ProjectCard` per project. Tech items display as small pill tags.

## 6. Styling

- Match the Home page's look: sections separated by alternating backgrounds (`--color-bg` / `--color-surface`).
- The page is compact: the reader should get through it with little scrolling. Use `--space-sm` inside cards and `--space-md` between sections; never `--space-lg`.
- Banners are thin strips, not tall images: `max-height: 140px` with `object-fit: cover`.
- Education entries are a compact grid: three across on desktop, one per row on mobile, one short line each.
- Work and project cards use tight line spacing and no oversized text; headings stay at their default sizes.
- Project images share a fixed height of 220px with `object-fit: contain` and a `--color-surface` background, so wide desktop screenshots and tall phone screenshots sit in equal-sized cards.
- Project cards sit two across on desktop and one per row at ≤ 768px.
- Cards: `--color-surface-alt` background, `--radius-lg` corners.
- Download button: `--radius-pill`, accent color on hover and focus.
- Tech tags: `--radius-pill`, small text, bordered with `--color-border`.
- Images use `--radius-lg` corners and never overflow their container.
- At ≤ 768px: everything is a single column; no horizontal scrolling at 375px.
- Colors only via custom properties from `src/styles/theme.css`. No hardcoded color values.

## 7. Constraints

- JavaScript only, never TypeScript.
- No new dependencies; icons from lucide-react.
- Content comes from `src/data/portfolio.js` and the text above; nothing is fetched.
- Do not change Header, Footer, Layout, BottomNav, Home, SkillCard, or routing.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Page at `/portfolio` | Click Portfolio in the nav; page renders |
| 2 | Education entries | 3 entries, each with institution, program, dates, newest first |
| 3 | Work entry | Title, organization, dates, and description shown |
| 4 | Project entries | CodeBloggs and Rocket Food Delivery cards each show image, name, tech tags, description |
| 5 | Resume download | Clicking the button downloads `Jacqlyn-Titus-Resume.pdf` and it opens |
| 6 | 3 distinct sections | Education, Work Experience, Projects clearly separated |
| 7 | 2 AI images with alt text | Both banners render; `alt` present on each image on the page |
| 8 | Responsive | At 375px: single column, no horizontal scroll |
| 9 | No hardcoded colors | Search `Portfolio.css` and `ProjectCard.css` for `#`: none |
| 10 | Build passes | `npm run build` succeeds |

## 9. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, the code is committed on `feature/portfolio-page`, and the branch is merged into `dev`.