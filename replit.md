# UniGuide 🍁 — Canadian University Planning

## Overview
A web app for Canadian high school students (Grades 9–12) to plan their university journey. Express.js backend + Replit PostgreSQL database + static HTML/CSS/JS frontend.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Landing page / home |
| `selections.html` | Combined Majors + Universities workspace (sidebar layout) |
| `major.html` | Legacy Majors page (still functional) |
| `universities.html` | Legacy Universities page (still functional) |
| `saved.html` | My List — saved programs |
| `scholarships.html` | Scholarship / Funding finder |
| `essays.html` | Essay writing guidance |
| `tracker.html` | Application tracker |
| `reset-password.html` | Password reset page (via token link) |
| `data.js` | All shared data: MAJORS (800+ programs), UNIVERSITIES (19 schools), SCHOLARSHIPS |
| `auth.js` | Auth layer — API-backed, JWT tokens, ugLoad/ugSave helpers |
| `server.js` | Express.js backend — auth API + static file server |
| `style.css` | Global design system |

## Architecture
- **Backend**: Express.js (`server.js`), port 5000
- **Database**: Replit PostgreSQL (DATABASE_URL env var)
- **Auth**: JWT tokens (30-day), bcrypt password hashing
- **Frontend**: Static HTML/CSS/JS, no build step, no framework
- **Workflow**: `node server.js`

## Database Schema
- `ug_users` — user accounts (email, password_hash, display_name, grade, province, city, institution, year_of_study, major, ethnicity)
- `ug_user_data` — key/value store for ugSave/ugLoad (saved programs, selections, etc.)
- `ug_reset_tokens` — password reset tokens (1-hour expiry)

## Auth API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account (email + password required; all other fields optional) |
| POST | `/api/auth/login` | Login, returns JWT |
| GET  | `/api/auth/me` | Get current user profile (requires JWT) |
| PUT  | `/api/auth/profile` | Update profile fields (requires JWT) |
| POST | `/api/auth/reset-request` | Generate reset token + link |
| POST | `/api/auth/reset-confirm` | Confirm new password with token |
| GET/PUT/DELETE | `/api/data/:key` | User data store (requires JWT) |

## Key Features (selections.html)
- **Sidebar layout**: Left nav (Majors / Universities) + main content area
- **Neutral start**: "Choose Majors or Universities" empty state
- **Majors panel**: Search 800+ programs, 15 category cards, discovery quiz, multi-select up to 5
- **Universities panel**: Search + 6 filters, fit scores (0–100%), reason badges, expandable program details
- **Save format**: "University Name — Major" stored in ug_user_data (cloud) + localStorage (cache)
- **Mobile**: Segmented top control replaces sidebar

## Navigation
All pages: `Selections | My List | Funding | Essays | Tracker | [Log In] [Start YOUR plan]`
When logged in: user avatar pill (clickable → opens profile modal) + Log Out button
