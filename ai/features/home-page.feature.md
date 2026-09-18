# Feature Spec: Home Page

Read `./ai/ai-spec.md` first. This spec covers Feature 3 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Replace the Home placeholder with the real landing page: an introduction, a technical skills section, and a soft skills section, including two AI-generated images.

## 2. Requirements Covered (FSD: Home Page)

Root path
1. Accessible at the root route `/`.
2. Default landing page.

Introduction section
3. Student name prominently displayed.
4. Role or tagline visible.
5. Brief introductory paragraph.

Technical skills section
6. At least 3 technical skills.
7. Each has supporting text (not a single word) and a representative icon.
8. Visually organized as cards in a grid.

Soft skills section
9. At least 3 soft skills.
10. Each has supporting text and a representative icon.
11. Visually organized as cards in a grid.

Layout
12. At least 3 distinct sections.
13. Sections visually separated.

AI images
14. At least 2 AI-generated images on the page.
15. Relevant to the page content or theme.
16. Appropriate alt text.
17. AI tool documented in `./ai/ai-assets.md`.

## 3. Files

- `src/pages/Home.jsx` + `Home.css` — replace the placeholder. Default export.
- `src/components/SkillCard.jsx` + `SkillCard.css` — reusable card showing an icon, a title, and supporting text. Named export.
- `src/data/skills.js` — exports `technicalSkills` and `softSkills` arrays. Each item: `{ title, description, icon }`, where `icon` is a lucide-react component reference.
- `src/assets/home-hero.png` and `src/assets/home-skills.png` — already present (currently placeholders; replaced later with AI-generated images of the same filenames). Do not modify them.

No other files change.

## 4. Content (use exactly)

Introduction
- Name (as the page's only `<h1>`): `Jacqlyn Titus`
- Tagline: `Full-Stack Developer`
- Paragraph: `I'm a full-stack developer who enjoys understanding how systems work from end to end. I love problem solving: stepping back to see the big picture, then zeroing in on the details that fix it. Twelve years in healthcare taught me to be prompt, precise, and comfortable working directly with clients, and I bring that same care to every project.`

Technical skills (`technicalSkills`)
| Title | Description | Icon |
|---|---|---|
| Front-End Development | I build responsive interfaces with React, JavaScript, HTML, and CSS. | `Code` |
| Back-End and APIs | I create REST APIs with Node.js and Express that connect front ends to data. | `Server` |
| Databases | I design and query data with MySQL, MongoDB, and Supabase. | `Database` |
| Git and Deployment | I manage code with Git and GitHub and automate deployments with GitHub Actions. | `GitBranch` |

Soft skills (`softSkills`)
| Title | Description | Icon |
|---|---|---|
| Technical Adaptability | I learn new tools and frameworks quickly and adjust smoothly when a project's needs change. | `RefreshCw` |
| Critical Thinking | I break complex problems into clear steps and weigh the options before choosing a solution. | `Brain` |
| Client-Focused Communication | I listen first, explain technical ideas in plain language, and keep the end user in mind. | `MessagesSquare` |

## 5. Page Structure

Three `<section>` elements, in this order:

1. Introduction
   - Two columns on desktop: text (name, tagline, paragraph) on one side, `home-hero.png` on the other.
   - Hero image alt text: `AI-generated illustration of a developer workspace blending forest and futuristic technology`.
2. Technical Skills
   - Heading `Technical Skills`.
   - `home-skills.png` displayed as a wide banner under the heading. Alt text: `AI-generated banner of glowing circuitry intertwined with leaves`.
   - Four `SkillCard`s in a grid (2 columns on desktop).
3. Soft Skills
   - Heading `Soft Skills`.
   - Three `SkillCard`s in a grid (3 columns on desktop).

Alt text may be updated when the final images replace the placeholders.

## 6. Styling

- Sections are visually separated by alternating backgrounds (`--color-bg` / `--color-surface`) and generous vertical spacing from the spacing scale.
- `SkillCard`: `--color-surface-alt` background, `--radius-lg` corners, icon in an accent color, subtle accent glow or border on hover.
- Images use `--radius-lg` corners and never overflow their container.
- At ≤ 768px: the introduction becomes a single column (text first, then image), and all card grids become a single column.
- Colors only via custom properties from `src/styles/theme.css`. No hardcoded color values.

## 7. Constraints

- JavaScript only, never TypeScript.
- No new dependencies; icons from lucide-react.
- Content comes from `src/data/skills.js` and the text above; nothing is fetched.
- Do not change Header, Footer, Layout, BottomNav, or routing.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Home at `/` and default | Open the site root; Home renders |
| 2 | Name prominent | "Jacqlyn Titus" is the page `<h1>` |
| 3 | Tagline visible | "Full-Stack Developer" shown under the name |
| 4 | Intro paragraph | Paragraph text matches §4 |
| 5 | 4 technical skills | Each card has icon, title, and sentence |
| 6 | 3 soft skills | Each card has icon, title, and sentence |
| 7 | 3 distinct sections | Intro, Technical Skills, Soft Skills clearly separated |
| 8 | 2 images with alt text | Both images render; `alt` present on each |
| 9 | AI images documented | Entries in `./ai/ai-assets.md` once final images are added |
| 10 | Responsive | At 375px: single column, no horizontal scroll |
| 11 | No hardcoded colors | Search `Home.css` and `SkillCard.css` for `#`: none |
| 12 | Build passes | `npm run build` succeeds |

## 9. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, the code is committed on `feature/home-page`, and the branch is merged into `dev`. Criterion 9 is completed when the final AI images replace the placeholders.