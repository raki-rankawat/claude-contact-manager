# Contact Manager — Progress Tracker

Mirrors [context/contact-manager-build-plan.md](context/contact-manager-build-plan.md).
Tick items off as you complete them. Status legend: `[ ]` todo · `[~]` in progress · `[x]` done.

_Last updated: 2026-06-29_

---

## Phase 1 — Init & setup
- [x] Scaffold Vite React (JS) project
- [x] Install deps (`react-router-dom`, `axios`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`)
- [x] Wire Tailwind v4 (vite plugin + `@import "tailwindcss";` in `index.css`)
- [x] Strip Vite boilerplate
- [x] Define brand-red theme token
- [ ] `npm run dev` serves a clean page, no console errors

## Phase 2 — UI shell (static)
- [ ] `main.jsx` + `App.jsx` (Router + 5 routes + provider stub)
- [ ] `Header.jsx` (red navbar: Home / Add / About)
- [ ] `ui/Button.jsx`, `ui/TextInput.jsx`, `ui/Spinner.jsx`
- [ ] `ContactsPage.jsx` + `ContactCard.jsx` (static cards, two-tone heading)
- [ ] `AddContactPage.jsx` + `EditContactPage.jsx` + `ContactForm.jsx` (static)
- [ ] `AboutPage.jsx` + `NotFoundPage.jsx`
- [ ] All routes render and navigate correctly

## Phase 3 — Features
- [ ] **F1** — Data layer / hybrid storage (`api/contactsApi.js`)
- [ ] **F2** — Global state (reducer + `ContactContext` + `useContacts`)
- [ ] **F3** — Contact list (read + spinner + empty state)
- [ ] **F4** — Card expand/collapse
- [ ] **F5** — Delete (persists after reload)
- [ ] **F6** — Add (`useForm` + validation, persists)
- [ ] **F7** — Edit (prefilled shared form, persists)
- [ ] **F8** — Static pages finalized (About + 404)

## Verification
- [ ] Add/Edit/Delete survive a page reload (localStorage)
- [ ] Form validation blocks empty/invalid submits
- [ ] Unknown URL → NotFound; `/about` correct
- [ ] `npm run build && npm run preview` succeeds, no console errors

---

## Notes / decisions
- Persistence: **hybrid** (JSONPlaceholder seed → localStorage).
- Styling: **modernized Tailwind redesign** of the screenshot layouts.
- _(add blockers, deviations, or ideas here as you go)_
