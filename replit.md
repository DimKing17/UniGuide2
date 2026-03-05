# UniGuide 🍁 — Canadian University Planning

## Overview
A static HTML/CSS/JS web app for Canadian high school students (Grades 9–12) to plan their university journey. No backend — all data is localStorage + optional Firebase cloud sync.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Landing page / home |
| `selections.html` | Combined Majors + Universities workspace (primary entry point) |
| `profile.html` | User Profile — personal info, quiz answers, background, settings, danger zone |
| `major.html` | Legacy Majors page (still functional, nav updated) |
| `universities.html` | Legacy Universities page (still functional, nav updated) |
| `saved.html` | My List — saved programs with full detail dashboards |
| `scholarships.html` | Scholarship / Funding finder |
| `essays.html` | Essay writing guidance |
| `tracker.html` | Application tracker |
| `data.js` | All shared data: MAJORS (328 programs, 0 duplicates), UNIVERSITIES (60 schools), SCHOLARSHIPS |
| `auth.js` | Auth layer + ugLoad/ugSave helpers (localStorage + Firebase fallback) |
| `style.css` | Global design system |

## Architecture
- Pure static HTML — served via `npx serve . -p 5000`
- No build step, no framework
- All data is in `data.js` (global constants)
- Auth and cloud sync handled by `auth.js`
- CSS variables for theming in `style.css`

## Key Features (selections.html)
- **Split workspace**: Majors picker (left) + Universities picker (right)
- **Majors panel**: Search 800+ programs, browse 15 categories, discovery quiz, multi-select up to 5
- **Universities panel**: Search + 6 filters, university cards with:
  - Fit score (0–100%) derived from program match, co-op, ranking
  - Up to 2 reason badges (e.g. "offers Mech Eng", "co-op available", "requires Calculus")
  - Expandable program details dropdown: Degree type, Co-op, Target Avg, Deadline, Tuition, Competitiveness, Required HS Courses
  - Save to My List with format "University Name — Major"
  - Toast confirmation with Undo button
- **Shared state**: selectedMajors persists via localStorage
- **Microflow**: Banner after major selection guiding next step
- **Mobile**: Tab bar to switch between Majors and Universities panels

## Navigation
All pages share nav: `Selections | My List | Funding | Essays | Tracker | [Log In] [Start YOUR plan]`
When logged in: `… | [User Pill] [Profile] [Log Out] | [Start YOUR plan]`
- Clicking the user pill or "Profile" goes to `profile.html`
- "Start YOUR plan" → `selections.html`

## Profile Page (`profile.html`)
- **Auth gate**: redirects logged-out users to sign-in prompt (no redirect, shows inline)
- **Header**: avatar, name, email, member since, profile completion bar (5 fields: name, grade, province, ethnicity, intended major)
- **A. Account**: email (read-only), send password reset email
- **B. Personal Info**: display name, grade, province, city — saved via `ugSaveProfile`
- **C. Background**: ethnicity (optional, labelled) — saved via `ugSaveProfile`
- **D. Academic Goals**: intended major (editable), selected majors (read-only pills from localStorage)
- **E. Quiz Results**: shows saved quiz answers (stored under key `quizAnswers` via `ugSave`); link to retake
- **F. Settings**: notification toggle (future-ready, disabled), data sharing toggle, download data as JSON
- **G. Danger Zone**: clear all saved data, delete account

## Quiz Answer Persistence
`showResults()` in `selections.html` now calls `ugSave('quizAnswers', a)` to persist answers to localStorage/Firestore. Profile page reads and displays them in a human-readable grid.
