# UniGuide 🍁 — Canadian University Planning

## Overview
A static HTML/CSS/JS web app for Canadian high school students (Grades 9–12) to plan their university journey. No backend — all data is localStorage + optional Firebase cloud sync.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Landing page / home |
| `selections.html` | Combined Majors + Universities workspace (primary entry point) |
| `major.html` | Legacy Majors page (still functional, nav updated) |
| `universities.html` | Legacy Universities page (still functional, nav updated) |
| `saved.html` | My List — saved programs with full detail dashboards |
| `scholarships.html` | Scholarship / Funding finder |
| `essays.html` | Essay writing guidance |
| `tracker.html` | Application tracker |
| `data.js` | All shared data: MAJORS (800+ programs), UNIVERSITIES (19 schools), SCHOLARSHIPS |
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
"Start YOUR plan" → `selections.html`
