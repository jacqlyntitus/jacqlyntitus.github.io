# Feature Spec: Login Page

Read `./ai/ai-spec.md` first. This spec covers Feature 7 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Add a secret login page that authenticates the site owner against Supabase Auth and sends a successful sign-in to the Back Office route.

## 2. Requirements Covered (FSD: Login Page)

Secret route
1. Not linked from the header navigation, the footer, or the mobile bottom navigation.
2. Reachable only by typing the URL directly (`/#/login`). No secret keyboard shortcut is used.

Form fields
3. Email input with `type="email"`.
4. Password input with `type="password"`.
5. A submit/login button.

Supabase Auth
6. `supabase.auth.signInWithPassword()` is called with the entered email and password.
7. The client comes from `src/lib/supabaseClient.js`.
8. The admin user already exists in Supabase; the app has no registration flow.

Success
9. Navigate to `/backoffice` after a successful sign-in.
10. The session is established and persists; refreshing after login does not sign the user out.
11. Visiting `/login` with an existing valid session redirects to `/backoffice`.

Failure
12. An error message is displayed on wrong credentials.
13. The error is visually distinct (red text).

## 3. Files

- `src/pages/Login.jsx` + `Login.css` — replace the placeholder. Default export.
- `src/lib/supabaseClient.js` — already exists. Import only; do not modify.
- `src/App.jsx` — only if the `/login` route is not already defined. Do not change any other route.

The Back Office page is Feature 8 and is not built here. If `/backoffice` does not yet exist, navigating there after login may land on a placeholder; that is expected.

No other files change.

## 4. Content (use exactly)

- Page heading (the page's only `<h1>`): `Login`
- Field labels: `Email`, `Password`
- Submit button label: `Log In`; while submitting: `Logging in...`
- Invalid credentials message: `Incorrect email or password.`
- Empty field message: `Please enter your email and password.`
- Fallback when Supabase is not configured: `Login is unavailable right now.`

No text on the page explains what the Back Office is, and no credentials, hints, or example values appear anywhere in the UI or in code comments.

## 5. Behavior

- Form state is held in React state (`useState`). No form libraries.
- On submit:
  - If either field is empty, show the empty-field message and do not call Supabase.
  - Otherwise set a submitting state, disable the button, and call `await supabase.auth.signInWithPassword({ email, password })`.
  - On success, navigate to `/backoffice` using `useNavigate` with `{ replace: true }`.
  - On error, show the invalid-credentials message. Do not surface the raw Supabase error text to the user; log it to the console instead.
- On mount, check for an existing session with `supabase.auth.getSession()`. If one exists, redirect to `/backoffice` immediately.
- Session persistence is handled by the Supabase client's default `localStorage` behavior. Do not write custom session storage.
- Check `isSupabaseConfigured` before using the client. When false, render the form disabled with the fallback message; never call the client.

## 6. Styling

- Consistent with the Contact page: a single centered card, max width about `420px`, `--color-surface-alt` background, `--radius-lg` corners.
- Inputs: full width, `--radius-md` corners, `--color-border` border, accent focus ring using `--color-electric`.
- Submit button: `--radius-pill`, accent color, visibly dimmed when disabled.
- Error text uses `--color-error` (already defined in `src/styles/theme.css`).
- Colors only via custom properties. No hardcoded color values.
- No horizontal scrolling at 375px.

## 7. Constraints

- JavaScript only, never TypeScript.
- No new dependencies; icons from lucide-react.
- Never hardcode the Supabase URL or key; the client reads them from `import.meta.env`.
- Never hardcode or comment the admin email or password anywhere in the codebase.
- Do not add a link to `/login` or `/backoffice` in Header, Footer, BottomNav, or any page.
- Do not change Home, Portfolio, Links, or Contact.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Route is secret | Search Header, Footer, and BottomNav for `login`: no match; nothing visible in the UI |
| 2 | Reachable by URL | Type `/#/login` in the address bar; the page renders |
| 3 | Field types | Email input is `type="email"`, password is `type="password"` |
| 4 | Empty submit blocked | Submit empty; the message shows and no request is sent |
| 5 | Wrong credentials | Submit a bad password; red error text appears |
| 6 | Successful login | Submit the admin credentials; the app navigates to `/backoffice` |
| 7 | Session persists | Refresh after login; still signed in, no bounce back to login |
| 8 | Existing session redirects | Visit `/#/login` while signed in; redirected to `/backoffice` |
| 9 | No credentials in code | Search the repo for the admin email: only this project's docs, never source |
| 10 | Responsive | At 375px: single column, no horizontal scroll |
| 11 | Build passes | `npm run build` succeeds |

## 9. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, the code is committed on `feature/login-page`, and the branch is merged into `dev`.