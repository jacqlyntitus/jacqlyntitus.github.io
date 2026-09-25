# Feature Spec: Contact Page

Read `./ai/ai-spec.md` first. This spec covers Feature 6 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Replace the Contact placeholder with a validated contact form that writes submitted messages to the Supabase `messages` table and gives the visitor clear success or failure feedback.

## 2. Requirements Covered (FSD: Contact Page)

Form fields
1. Text input for name.
2. Email input for email.
3. Textarea for message.
4. All fields have a visible label or placeholder.

Client-side validation
5. All three fields are required; submission is blocked when any is empty.
6. Email format is validated.
7. Validation errors are displayed to the user.
8. The submit button is disabled, or the submission is rejected, when validation fails.

Supabase submission
9. A valid submission INSERTs a row into the `messages` table.
10. The payload includes `name`, `email`, and `message`.
11. The Supabase client comes from `src/lib/supabaseClient.js`.

Feedback
12. A success or failure message is displayed.
13. Success is visually distinct (green, check icon).
14. Failure is visually distinct (red, X icon).
15. Form fields are cleared after a successful submission.
16. The success message disappears after a few seconds or on the next interaction.

## 3. Files

- `src/pages/Contact.jsx` + `Contact.css` — replace the placeholder. Default export.
- `src/lib/supabaseClient.js` — already exists. Import only; do not modify.

No new components, no new data files, no new assets. No other files change.

## 4. Content (use exactly)

- Page heading (the page's only `<h1>`): `Contact`
- Intro line under the heading: `Get in touch about opportunities, projects, or questions.`
- Field labels: `Name`, `Email`, `Message`
- Submit button label: `Send Message`; while submitting: `Sending...`
- Validation messages:
  - Name empty: `Please enter your name.`
  - Email empty: `Please enter your email address.`
  - Email invalid: `Please enter a valid email address.`
  - Message empty: `Please enter a message.`
- Success message: `Thanks for reaching out. Your message has been sent.`
- Failure message: `Something went wrong. Please try again, or email me directly.`
- Fallback when Supabase is not configured: `The contact form is unavailable right now. Please email me directly at jacqlyntitus@gmail.com.`

## 5. Behavior

- Form state is held in React state (`useState`). No form libraries.
- Validation runs on submit and re-validates a field as the user corrects it. Each field's error appears directly beneath that field.
- Email format check uses a simple regular expression; do not add a validation library.
- On valid submit:
  - Set a submitting state; disable the submit button while the request is in flight.
  - `await supabase.from('messages').insert({ name, email, message })`.
  - On success: clear all three fields, show the success message, and remove it automatically after 5 seconds.
  - On error: show the failure message and keep the entered values so nothing is lost. Log the Supabase error to the console.
- Check `isSupabaseConfigured` before using the client. When false, render the form as disabled with the fallback message above; never call the client.
- Do not render a link, button, or hint pointing to the login or back office routes.

## 6. Styling

- Compact and consistent with the Portfolio and Links pages: `--space-sm` inside blocks, `--space-md` between blocks.
- The form sits in a single centered column with a comfortable max width (about `520px`), on a `--color-surface-alt` card with `--radius-lg` corners.
- Inputs and the textarea: full width, `--radius-md` corners, `--color-border` border, accent-colored focus ring using `--color-electric`.
- Submit button: `--radius-pill`, accent color, visibly dimmed when disabled.
- Success feedback uses green with the lucide-react `Check` icon; failure uses red with the lucide-react `X` icon. Add the two needed colors as new custom properties in `src/styles/theme.css` (`--color-success` and `--color-error`) rather than hardcoding hex values in the page stylesheet.
- Field error text uses `--color-error`, small size, directly under its field.
- No horizontal scrolling at 375px; the form is full width on mobile.

## 7. Constraints

- JavaScript only, never TypeScript.
- No new dependencies; icons from lucide-react; the Supabase client is already installed.
- Never hardcode the Supabase URL or key; the client reads them from `import.meta.env`.
- Do not change Header, Footer, Layout, BottomNav, Home, Portfolio, Links, or routing.
- Adding `--color-success` and `--color-error` to `theme.css` is the only permitted change outside the Contact page files.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Page at `/contact` | Click Contact in the nav; the form renders |
| 2 | Three labelled fields | Name, Email, Message each have a visible label |
| 3 | Empty submit blocked | Submit with empty fields; errors show, no row is inserted |
| 4 | Email format checked | Enter `abc`; the invalid-email error shows |
| 5 | Successful insert | Submit valid values; the row appears in Supabase Table Editor |
| 6 | Success feedback | Green message with a check icon appears |
| 7 | Fields cleared | All three inputs are empty after success |
| 8 | Success auto-dismisses | The message disappears after about 5 seconds |
| 9 | Failure feedback | Red message with an X icon (test by temporarily using a bad table name) |
| 10 | No secrets in code | Search the page files for the Supabase URL or key: none |
| 11 | Responsive | At 375px: single column, no horizontal scroll |
| 12 | Build passes | `npm run build` succeeds |

## 9. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, a test row is visible in the Supabase `messages` table, the code is committed on `feature/contact-page`, and the branch is merged into `dev`.