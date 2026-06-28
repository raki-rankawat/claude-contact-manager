# Plan: Build the Contact Manager App (Vite + React + Tailwind)

## Context

We're building a Contact Manager web app from scratch. This plan consolidates the stack/feature decisions (previously kept in a separate planning doc) with the UI defined by the screenshots:

- **Stack & feature set** — captured directly in this document (see *Target stack* and *Phase 3*).
- **`context/screenshots/` (4 images)** — define the actual UI/UX of the deployed app (`rrankawat-contact-manager.netlify.app`).

**Decisions locked in (from user):**
- **Persistence: Hybrid** — on first load, seed contacts from JSONPlaceholder via axios; thereafter read/write everything through `localStorage` so add/edit/delete genuinely persist across reloads. The data layer stays a single swappable module.
- **Styling: Modernized redesign** — keep the same pages, layout, and red brand identity from the screenshots, but apply a polished Tailwind treatment (soft shadows, rounded cards, hover states, consistent spacing). Not a pixel-for-pixel Bootstrap clone.

**Build order (as requested): (1) Init & setup → (2) UI shell → (3) feature-by-feature.**

**Routes match the screenshots (singular `contact`):** `/`, `/contact/add`, `/contact/edit/:id`, `/about`, `*`.

---

## Target stack

- **React 18** — functional components + hooks only.
- **Vite** (`@vitejs/plugin-react`) — scripts: `npm run dev` / `build` / `preview`.
- **react-router-dom v6** — `Routes`/`Route element=`, `useNavigate`, `useParams`.
- **axios** — single configured instance, used only for the initial JSONPlaceholder seed.
- **Tailwind CSS v4** — via the `@tailwindcss/vite` plugin (single `@import "tailwindcss";` in `index.css`; no separate postcss/autoprefixer config needed).
- **lucide-react** — icons (`Home`, `UserPlus`, `Info`, `ChevronDown`, `Pencil`, `Trash2`).

## Project structure

```
src/
  api/contactsApi.js          # axios seed + localStorage CRUD (the hybrid swap point)
  context/
    contactReducer.js         # action types + pure reducer
    ContactContext.jsx        # createContext + ContactProvider (useReducer + initial load)
    useContacts.js            # hook wrapping useContext
  hooks/useForm.js            # controlled form state + validation
  components/
    layout/Header.jsx         # red navbar
    contacts/ContactList.jsx
    contacts/ContactCard.jsx
    contacts/ContactForm.jsx  # ONE shared form for Add + Edit
    ui/TextInput.jsx
    ui/Spinner.jsx
    ui/Button.jsx
  pages/
    ContactsPage.jsx
    AddContactPage.jsx
    EditContactPage.jsx
    AboutPage.jsx
    NotFoundPage.jsx
  App.jsx                     # Router + Routes, wrapped in ContactProvider
  main.jsx                    # ReactDOM root
  index.css                   # @import "tailwindcss"; + base theme tokens
```

---

## Phase 1 — Init & setup

1. Scaffold: `npm create vite@latest . -- --template react` (JS, not TS) in the project root.
2. Install deps: `npm i react-router-dom axios lucide-react` and `npm i -D tailwindcss @tailwindcss/vite`.
3. Wire Tailwind: add the `@tailwindcss/vite` plugin in `vite.config.js`; replace `src/index.css` contents with `@import "tailwindcss";` plus a small `@theme` block for the brand red.
4. Strip Vite boilerplate (`App.css`, demo markup, logos). Leave `App.jsx` as a minimal shell.
5. Define brand tokens once (a `brand` red ≈ `#e23636`/red-600 to echo the screenshot navbar) so colors are reused, not hardcoded per component.

**Done when:** `npm run dev` serves a blank Tailwind-styled page with no console errors.

## Phase 2 — UI shell (static, no data yet)

Build the full visual skeleton with hardcoded placeholder content so the design is locked before wiring logic.

1. **`main.jsx`** — mount `<App/>` in React root.
2. **`App.jsx`** — `BrowserRouter` + `Routes` for all 5 routes; wrap everything in `ContactProvider` (provider can be a no-op stub this phase). Render `<Header/>` above the routed page.
3. **`Header.jsx`** — red sticky navbar: "Contact Manager" wordmark left; right-aligned `NavLink`s Home / Add / About, each with a lucide icon. Active-link styling.
4. **`ui/` primitives:**
   - `Button.jsx` — variants (primary red, subtle/ghost) + `as` link support.
   - `TextInput.jsx` — `label, name, value, onChange, error, placeholder, type`; red-border + message on error.
   - `Spinner.jsx` — centered loading indicator.
5. **Pages with static markup matching the screenshots' layout:**
   - `ContactsPage.jsx` — two-tone "**Contact** List" heading (red + neutral) over a vertical stack of 2–3 placeholder `ContactCard`s.
   - `ContactCard.jsx` — bordered, rounded, shadowed card: name + chevron toggle on the left, pencil + red trash icons on the right; expandable Email/Phone detail rows (use local `useState` for the open/closed visual now).
   - `AddContactPage.jsx` — card titled "Add Contact" rendering a static `ContactForm`.
   - `EditContactPage.jsx` — same form, titled "Edit Contact".
   - `AboutPage.jsx` — "About Contact Manager", tagline "Simple app to manage contacts", "Version 1.0".
   - `NotFoundPage.jsx` — 404 message + link home.
   - `ContactForm.jsx` — Name / Email / Phone via `TextInput` + submit `Button` (no submit logic yet).

**Done when:** every route renders the modernized design and navbar links navigate correctly.

## Phase 3 — Feature-by-feature implementation

Each feature is independently verifiable; build in this order.

### F1 — Data layer (hybrid storage) · `api/contactsApi.js`
The single swap point. Exposes 5 async functions returning Promises so component/spinner code never changes:
- `getContacts()` — if `localStorage["contacts"]` exists, parse and return it; otherwise `axios.get` JSONPlaceholder `/users`, map to `{id, name, email, phone}`, persist to localStorage, and return.
- `getContact(id)` — resolve from the persisted list.
- `addContact(data)` — assign a new id (e.g. `Date.now()` or max+1), append, persist, return the created contact.
- `updateContact(id, data)` — merge by id, persist, return updated.
- `deleteContact(id)` — filter by id, persist.
Keep a private `read()`/`write()` localStorage helper pair inside this module.

### F2 — Global state · `contactReducer.js` + `ContactContext.jsx` + `useContacts.js`
- `contactReducer.js` — actions `SET_CONTACTS`, `ADD_CONTACT`, `UPDATE_CONTACT`, `DELETE_CONTACT`, `SET_LOADING`; pure reducer.
- `ContactContext.jsx` — `ContactProvider` uses `useReducer`; on mount `useEffect` calls `getContacts()` → `SET_CONTACTS` (toggling loading). Exposes `{ contacts, loading, dispatch }` plus thin async action helpers (`addContact`, `editContact`, `removeContact`) that call the API then dispatch.
- `useContacts.js` — `useContext` wrapper hook.
- Replace the Phase-2 provider stub with this real provider.

### F3 — Contact list (read) · `ContactsPage.jsx` + `ContactList.jsx` + `ContactCard.jsx`
Pull `contacts`/`loading` from `useContacts()`. Show `Spinner` while loading; map real contacts to `ContactCard`. Empty-state message when the list is empty.

### F4 — Card expand/collapse
`ContactCard` local `useState` toggles Email/Phone rows; chevron rotates (matches screenshot 2's expanded Leanne Graham).

### F5 — Delete
Trash icon → call `removeContact(id)` (API delete + `DELETE_CONTACT`); card disappears and stays gone after reload (localStorage).

### F6 — Add · `AddContactPage.jsx` + `ContactForm.jsx` + `hooks/useForm.js`
`useForm` manages fields + validation (required name/email, basic email format). Submit → `addContact()` → `ADD_CONTACT` → `navigate('/')`. New contact persists across reload.

### F7 — Edit · `EditContactPage.jsx`
`useParams()` id → `getContact(id)` prefills the **same** `ContactForm` (DRY — no duplicate form). Submit → `editContact()` → `UPDATE_CONTACT` → `navigate('/')`.

### F8 — Static pages · `AboutPage.jsx` + `NotFoundPage.jsx`
Finalize About content and the 404 fallback (`path="*"`).

---

## Key reuse / DRY notes
- **One `ContactForm`** serves both Add and Edit (takes `initialValues` + `onSubmit`) — avoids the original tutorial's duplicated AddContact/EditContact forms.
- **One axios instance** in `contactsApi.js` centralizes URLs.
- **`useForm`** centralizes controlled-input + validation logic so both pages share it.
- **`api/contactsApi.js` is the only file touching storage** — swapping persistence later means editing just this file.

## Verification
1. `npm run dev` → app loads, navbar + routes work.
2. First load seeds JSONPlaceholder contacts; `Spinner` shows briefly.
3. **Add** a contact → appears in list, redirects home, **survives reload** (localStorage).
4. **Edit** → form prefills, save updates the card, persists after reload.
5. **Delete** → card removed, stays gone after reload.
6. Expand/collapse toggles Email/Phone. Form validation blocks empty/invalid submits.
7. Unknown URL → NotFound. `/about` shows About content.
8. `npm run build && npm run preview` succeeds with no console errors.
9. Confirm `localStorage["contacts"]` reflects the current list after each mutation (DevTools → Application).
