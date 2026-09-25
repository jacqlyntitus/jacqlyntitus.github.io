# Feature Spec: Back Office

Read `./ai/ai-spec.md` first. This spec covers Feature 8 of 8. If any folder or naming rule here conflicts with `ai-spec.md`, `ai-spec.md` wins.

## 1. Purpose

Add an authenticated Back Office page that lists the messages submitted through the contact form, lets the site owner read a full message in a modal, delete a message, open a reply in their mail client, and log out.

## 2. Requirements Covered (FSD: Back Office)

Route
1. `/backoffice` while authenticated renders the Back Office page.
2. `/backoffice` while not authenticated redirects to `/login`.
3. The page verifies authentication before rendering.
4. The route is not included in public navigation.

Messages table
5. Fetch and display all rows from the `messages` table.
6. An error message is displayed if the fetch fails.
7. `No messages yet` is displayed when the table is empty.
8. Columns: Name, Email, Date, Actions.
9. One row per message.
10. Ordered by `created_at` descending.
11. A delete button on each message.
12. A deleted message disappears from the table instantly.

View modal
13. Clicking the row or a View button opens a modal with the full message.
14. The modal shows sender name and email, date and time, and the full message text.
15. The modal has a close button (X or Close).
16. Clicking outside the modal or pressing Escape closes it.

Logout
17. A logout button is visible on the Back Office page.
18. It calls `supabase.auth.signOut()` and fully clears the session.
19. It redirects to `/login`.

Additional (coach demo detail, not in the checklist)
20. Clicking a message's email address opens the user's mail client with a new message to that address.

## 3. Files

- `src/pages/BackOffice.jsx` + `BackOffice.css` — new page. Default export.
- `src/components/MessageModal.jsx` + `MessageModal.css` — the view modal. Named export.
- `src/App.jsx` — add the `/backoffice` route only. Do not change any other route.
- `src/lib/supabaseClient.js` — already exists. Import only; do not modify.

No other files change.

## 4. Content (use exactly)

- Page heading (the page's only `<h1>`): `Back Office`
- Logout button label: `Log Out`
- Table column headers: `Name`, `Email`, `Date`, `Actions`
- Row action labels: `View`, `Delete`
- Empty state: `No messages yet.`
- Fetch failure: `Could not load messages. Please refresh the page.`
- Delete failure: `Could not delete that message. Please try again.`
- Modal close button label: `Close`
- Modal field labels: `From`, `Email`, `Received`

## 5. Behavior

Authentication gate
- On mount, call `supabase.auth.getSession()`.
- While the check is in flight, render nothing or a simple loading line; never render the message table before the session is confirmed.
- If there is no session, navigate to `/login` with `{ replace: true }`.
- Subscribe to `supabase.auth.onAuthStateChange` so that a sign-out in another tab also redirects. Unsubscribe on unmount.

Fetching
- After the session is confirmed: `await supabase.from('messages').select('*').order('created_at', { ascending: false })`.
- On error, show the fetch-failure message instead of the table and log the error to the console.
- When the query succeeds with zero rows, show the empty-state text.

Table
- One row per message: name, email, and the formatted date.
- Date column uses the browser's locale short date, for example `toLocaleDateString()`.
- The email cell is a `mailto:` link to that sender's address. Clicking it opens the mail client and must not open the modal.
- Actions column holds a View button and a Delete button.

View modal
- Opens when the row is clicked or the View button is pressed.
- Shows the sender name, the email, the full date and time, and the complete message text with line breaks preserved.
- Closes on the close button, on a click of the backdrop outside the modal, and on the Escape key.
- Remove the Escape key listener when the modal closes or the component unmounts.

Delete
- `await supabase.from('messages').delete().eq('id', id)`.
- On success, remove that message from local state immediately so the row disappears without a refetch.
- On failure, show the delete-failure message and leave the row in place.
- If the deleted message is open in the modal, close the modal.

Logout
- `await supabase.auth.signOut()`, then navigate to `/login` with `{ replace: true }`.

Not configured
- Check `isSupabaseConfigured` before any client call. When false, render the fetch-failure message and no table; never call the client.

## 6. Styling

- Consistent with the rest of the site: `--space-sm` inside blocks, `--space-md` between blocks, theme custom properties only.
- The page header is a single row: `<h1>Back Office</h1>` on the left, the `Log Out` button on the right. The logout button uses `--radius-pill`.
- The table sits on a `--color-surface-alt` card with `--radius-lg` corners; header row in `--color-text-muted`, row separators in `--color-border`, and a subtle row hover state.
- Delete buttons use `--color-error`; View buttons use the accent color. Both are compact.
- Modal: centered card, max width about `560px`, `--color-surface` background, `--radius-lg` corners, over a dimmed backdrop. The message body scrolls if it is long.
- At ≤ 768px the table must not overflow the viewport. Either let the table scroll horizontally inside its own container, or render each message as a stacked card. Either approach is acceptable; no horizontal scrolling of the page itself at 375px.
- No hardcoded color values.

## 7. Constraints

- JavaScript only, never TypeScript.
- No new dependencies; icons from lucide-react.
- Never hardcode the Supabase URL or key; the client reads them from `import.meta.env`.
- Never hardcode or comment the admin email or password anywhere.
- Do not add a link to `/backoffice` or `/login` in Header, Footer, BottomNav, or any page.
- Do not change Home, Portfolio, Links, Contact, or Login.
- The app never sends messages; there is no reply form inside the application.

## 8. Acceptance Criteria and Verification

| # | Criterion | How to verify |
|---|-----------|---------------|
| 1 | Auth gate | Visit `/#/backoffice` signed out; redirected to `/login` |
| 2 | Renders when signed in | Log in; the Back Office renders |
| 3 | Not in navigation | Search Header, Footer, and BottomNav for `backoffice`: no match |
| 4 | Messages listed | Submitted contact messages appear, one row each |
| 5 | Newest first | Send two messages; the newer is on top |
| 6 | Columns | Name, Email, Date, Actions headers present |
| 7 | Empty state | With an empty table, `No messages yet.` shows |
| 8 | Modal opens | Click a row or View; the full message shows with date and time |
| 9 | Modal closes | Close button, backdrop click, and Escape each close it |
| 10 | Email link | Clicking an email opens the mail client, not the modal |
| 11 | Delete | Click Delete; the row disappears instantly and the row is gone in Supabase |
| 12 | Logout | Click Log Out; lands on `/login`, and `/#/backoffice` no longer renders |
| 13 | Responsive | At 375px: no page-level horizontal scroll |
| 14 | Build passes | `npm run build` succeeds |

## 9. Definition of Done

All acceptance criteria pass in the browser at desktop and mobile widths, the code is committed on `feature/back-office`, and the branch is merged into `dev`.