# Concepts

## 1. Supabase Row Level Security (RLS)

**Purpose in the project:** The contact form writes straight from the browser to the database with no backend server. RLS policies decide who can do what: anyone can insert a message, but only the logged-in admin can read or delete messages.

**Why it was challenging:** Security used to live on a backend server. Here the browser talks straight to the database, so I had to understand how policies protect the data when there's no server in between.

**Where it's used:**
- `src/pages/Contact.jsx` line 64: public insert into `messages`
- `src/pages/BackOffice.jsx` line 51: select, allowed only when authenticated
- `src/pages/BackOffice.jsx` line 67: delete, allowed only when authenticated
- Policies themselves are defined in the Supabase dashboard, not in the repo

## 2. Protected Route / Auth Session Gate

**Purpose in the project:** The Back Office must only render for the signed-in admin. The page checks for a Supabase session before showing anything, redirects to login when there isn't one, and listens for sign-out so the page reacts immediately.

**Why it was challenging:** The session check is asynchronous, so the page has to wait for the answer before deciding what to show, and it also has to react when the user logs out.

**Where it's used:**
- `src/pages/BackOffice.jsx` line 22: `getSession()` check before rendering
- `src/pages/BackOffice.jsx` line 34: `onAuthStateChange` listener
- `src/pages/Login.jsx` line 18: existing session skips login and goes to Back Office

## 3. HashRouter on GitHub Pages

**Purpose in the project:** GitHub Pages only serves static files and has no server to handle routes like `/portfolio`. HashRouter keeps the real URL at the site root and puts the route after the `#`, so every page loads and refreshes without a 404.

**Why it was challenging:** Normal routes break on GitHub Pages because there's no server to answer them. I had to understand why the refresh 404s happen and how the `#` avoids them.

**Where it's used:**
- `src/main.jsx` line 3: import
- `src/main.jsx` line 10: wraps the app