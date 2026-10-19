# University Hub — Full Stack Project

A learning project that pairs a **Django + Django REST Framework** backend with a **React** frontend. It manages university departments, courses, and students, and demonstrates core full-stack concepts: models, migrations, authentication, REST APIs, and React routing/state.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend (Django)](#1-backend-django)
  - [2. Frontend (React)](#2-frontend-react)
- [Running the Project](#running-the-project)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Django Admin](#django-admin)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)

---

## Overview

The repository contains two independent applications:

| Folder | Description | Runs on |
| --- | --- | --- |
| `Django/UniversityHub` | REST API + server-rendered pages for departments, courses, and students | `http://127.0.0.1:8000` |
| `university-web` | React single-page app that consumes the API | `http://localhost:3000` |

The React app talks to the Django API over CORS (already configured for `http://localhost:3000`).

---

## Live Demo

| Part | URL |
| --- | --- |
| React app | https://university-web-kappa.vercel.app |
| Django API | https://universityhub-api.onrender.com |
| API health check | https://universityhub-api.onrender.com/academic/hello/ |
| Django admin | https://universityhub-api.onrender.com/admin/ |

The frontend runs on Vercel, the API on Render, and the database is a Neon Postgres branch. All three are connected to this GitHub repository.

> **Free tier note:** the Render service sleeps after ~15 minutes of inactivity, so the first request can take 30–60 seconds.

---

## Tech Stack

**Backend**
- Python 3.10+
- Django 6.x
- Django REST Framework
- Django CORS Headers
- Pillow (image uploads)
- SQLite (default database)

**Frontend**
- React 19 (Create React App / `react-scripts`)
- React Router 7
- Axios
- Tailwind CSS 3

---

## Project Structure

```
MyFullStackProject/
├── .gitignore
├── Django/
│   ├── runserver.bat                 # Windows helper: install deps + run server
│   ├── venv/                         # local virtual environment (not committed)
│   └── UniversityHub/
│       ├── manage.py
│       ├── requirements.txt
│       ├── db.sqlite3                # local database (not committed)
│       ├── UniversityHub/            # project settings
│       │   ├── settings.py
│       │   ├── urls.py
│       │   ├── asgi.py
│       │   └── wsgi.py
│       ├── academic/                 # main application
│       │   ├── models.py             # department, course, Student
│       │   ├── views.py              # HTML views + REST ViewSets
│       │   ├── serializers.py
│       │   ├── forms.py
│       │   ├── urls.py
│       │   ├── admin.py
│       │   ├── migrations/
│       │   ├── static/academic/
│       │   └── templates/academic/
│       └── templates/                # base + registration templates
└── university-web/
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
        ├── index.js                  # entry point (Router + AuthProvider)
        ├── App.js                    # routes
        ├── context/AuthContext.jsx   # auth state + token handling
        └── components/               # pages and UI pieces
```

---

## Features

- Department, course, and student data models with relationships (FK and M2M)
- Course syllabus file uploads and student profile pictures (Pillow)
- Token authentication (`/api-token-auth/`) for API access
- Session-based login for the server-rendered pages
- Role check: only staff users can delete students
- Student profile page restricted to its owner
- React SPA with routing for Home, Students, Courses, Course Details, About, Contact, and Login
- Login state persisted in `localStorage` and re-applied to Axios on reload
- Tailwind CSS styling

---

## Getting Started

### Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer (npm included)
- Git

Check your versions:

```bash
python --version
node --version
npm --version
```

### 1. Backend (Django)

From the repository root:

```bash
cd Django/UniversityHub
```

Create and activate a virtual environment. On Windows:

```powershell
python -m venv ../venv
../venv/Scripts/activate
```

On macOS/Linux:

```bash
python3 -m venv ../venv
source ../venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create the database and apply migrations:

```bash
python manage.py migrate
```

Optional — create an admin account for the Django admin site:

```bash
python manage.py createsuperuser
```

Start the server:

```bash
python manage.py runserver
```

The API is now available at `http://127.0.0.1:8000/`.

> **Note:** `db.sqlite3` is not committed to Git. Running `migrate` creates a fresh, empty database. Any previously committed database file was corrupted, so the fresh one is the reliable option.

### 2. Frontend (React)

Open a **second terminal**:

```bash
cd university-web
npm install
npm start
```

The app opens at `http://localhost:3000/`.

---

## Running the Project

Start both servers (in separate terminals):

```bash
# Terminal 1 — backend
cd Django/UniversityHub
../venv/Scripts/python manage.py runserver

# Terminal 2 — frontend
cd university-web
npm start
```

Then open `http://localhost:3000/`.

On Windows you can also use the helper script, which installs dependencies and starts Django:

```powershell
Django\runserver.bat
```

---

## API Reference

Base URL: `http://127.0.0.1:8000`

### Server-rendered pages

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/academic/hello/` | Health-check style welcome message |
| GET | `/academic/courses/` | Course list page (login required) |
| GET | `/academic/courses/add/` | Add course form (login required) |
| GET | `/academic/courses/edit/<id>/` | Edit course form (login required) |
| GET | `/academic/department/<id>/` | Department details |
| GET | `/academic/register-student/` | Student registration form |
| GET | `/academic/register/` | Alias for student registration |
| GET | `/academic/delete-student/<id>/` | Delete a student (staff only) |
| GET | `/academic/profile/<id>/` | Student profile (owner only) |
| GET | `/login/`, `/logout/` | Session login/logout |

### REST API

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/academic/api/courses/` | Public | List courses |
| GET | `/academic/api/courses/<id>/` | Public | Retrieve a course |
| POST | `/academic/api/courses/` | Token | Create a course |
| PUT/PATCH | `/academic/api/courses/<id>/` | Token | Update a course |
| DELETE | `/academic/api/courses/<id>/` | Token | Delete a course |
| GET | `/academic/api/courses/semester/<n>/` | Public | Courses in a semester |
| GET | `/academic/api/courses/syllabus/` | Public | Courses that have a syllabus |
| GET | `/academic/api/courses/<id>/syllabus/` | Public | A single course with syllabus |
| GET | `/academic/api/students/` | Token | List students |
| POST | `/academic/api/students/` | Public | Register a student |
| PUT/PATCH/DELETE | `/academic/api/students/<id>/` | Token | Update/delete a student |
| POST | `/api-token-auth/` | — | Obtain an auth token |

### Example requests

Get a token:

```bash
curl -X POST http://127.0.0.1:8000/api-token-auth/ \
  -H "Content-Type: application/json" \
  -d '{"username": "youruser", "password": "yourpass"}'
```

Response:

```json
{ "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b" }
```

List students with the token:

```bash
curl http://127.0.0.1:8000/academic/api/students/ \
  -H "Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
```

Register a student (public endpoint):

```bash
curl -X POST http://127.0.0.1:8000/academic/api/students/ \
  -F "first_name=Asha" \
  -F "last_name=Menon" \
  -F "email=asha@university.edu.com"
```

---

## Authentication

Two mechanisms are enabled:

1. **Session authentication** — used by the Django HTML pages (`/login/`).
2. **Token authentication** — used by the React app.

In the React app:

- Logging in stores the token under `userToken` in `localStorage`.
- The token is attached to every Axios request as `Authorization: Token <token>`.
- On page reload, `AuthContext` restores the token synchronously so requests made during the first render are authenticated.
- Logging out clears the token and the Axios header.

---

## Django Admin

1. Create a superuser (once): `python manage.py createsuperuser`
2. Open `http://127.0.0.1:8000/admin/`
3. Log in with the superuser credentials

From the admin you can manage departments, courses, students, and users.

---

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `python manage.py runserver` | Start the development server |
| `python manage.py migrate` | Apply database migrations |
| `python manage.py makemigrations` | Create new migrations after model changes |
| `python manage.py createsuperuser` | Create an admin user |
| `python manage.py check` | Validate the project configuration |
| `python manage.py test` | Run tests |

### Frontend

| Command | Description |
| --- | --- |
| `npm start` | Run the app in development mode |
| `npm run build` | Create an optimized production build in `build/` |
| `npm test` | Run the test runner |
| `npm run eject` | Eject from Create React App (irreversible) |

---

## Troubleshooting

**`ModuleNotFoundError: No module named 'corsheaders'`**
Install dependencies again with `pip install -r requirements.txt`. `django-cors-headers` is required by `settings.py`.

**`django.db.utils.DatabaseError: file is not a database`**
The SQLite file is corrupt. Delete `Django/UniversityHub/db.sqlite3` and run `python manage.py migrate` to recreate it.

**CORS error in the browser**
Make sure the backend is running on `127.0.0.1:8000` and the frontend on `localhost:3000`. Only that origin is allow-listed in `CORS_ALLOWED_ORIGINS`.

**Students page stuck on "Loading students..." or shows "Please log in"**
The student list endpoint requires authentication. Log in first at `/login`, then revisit the page.

**`npm start` fails with "running scripts is disabled on this system" (Windows)**
Use `npm.cmd` instead of `npm`, or run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Port already in use**
Run Django on another port: `python manage.py runserver 8001` and update `REACT_APP_API_URL` in `university-web/.env.local` accordingly.

---

## Deployment

This project is deployed with the following (free) setup:

| Part | Host | Why |
| --- | --- | --- |
| Django API | [Render](https://render.com) | Runs Python, free web service |
| Database | [Neon](https://neon.tech) | Free managed Postgres (Render's free disk is ephemeral) |
| React app | [Vercel](https://vercel.com) | Built for static/CRA frontends, free |

Both hosts build from this GitHub repository. Vercel redeploys automatically on every push, and a GitHub Actions workflow triggers a Render deploy through a deploy hook whenever backend files change.

### Current deployment

| Component | Service | Notes |
| --- | --- | --- |
| Frontend | Vercel project `university-web` | Git-connected to `main`, root directory `university-web`, `REACT_APP_API_URL` set to the Render URL |
| Backend | Render service `universityhub-api` | Blueprint `University_hub`, `DATABASE_URL` points at Neon, `CORS_ALLOWED_ORIGINS` allows the Vercel URL |
| Database | Neon project `university_hub`, branch `production` | Schema applied with `python manage.py migrate` |

### Redeploying

- **Push to `main`** — Vercel rebuilds the frontend automatically (its Git integration is connected).
- **Backend** — pushes to `main` that change `Django/`, `render.yaml`, or the workflow file run **Deploy backend to Render**, which calls the Render deploy hook stored in the `RENDER_DEPLOY_HOOK_URL` repository secret. Run that workflow manually from the Actions tab, or use the Render dashboard (**Manual Deploy → Deploy latest commit**), for anything else.
- **Manual frontend deploy** — `cd university-web && vercel deploy --prod`.
- **Database changes** — run migrations from the Render build (`build.sh` already does this) or locally with `DATABASE_URL` set to the Neon connection string.

The steps below describe how to recreate this setup from scratch.

### Step 1 — Create the Neon database

1. Sign up at [neon.tech](https://neon.tech) and create a project.
2. Copy the **connection string** from the dashboard. It looks like:
   ```
   postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
3. Keep it handy for the next step.

### Step 2 — Deploy the backend on Render

1. Sign up at [render.com](https://render.com) and connect your GitHub account.
2. Click **New → Blueprint**, select the `MyFullStackProject` repo.
   Render reads `render.yaml` from the repository root and configures the service automatically.
3. When prompted, fill in the environment variables:

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | The Neon connection string from Step 1 |
   | `CORS_ALLOWED_ORIGINS` | Your Vercel URL (add after Step 3, e.g. `https://university-web.vercel.app`) |

   `SECRET_KEY` is generated automatically. `DEBUG` is set to `False`. `CSRF_TRUSTED_ORIGINS` does not need to be set — the backend's own `onrender.com` hostname is added automatically.
4. Click **Apply**. The first deploy runs `build.sh`, which installs dependencies, collects static files, and applies migrations.
5. Wait for the build to finish, then open:
   ```
   https://<your-service>.onrender.com/academic/hello/
   ```
   You should see `Welcome to University Hub!`.

> **Free tier note:** Render's free services sleep after ~15 minutes of inactivity. The first request afterwards takes ~30–60 seconds to wake up.

**Create an admin user.** Render's free plan has no shell access, so use the optional build-time superuser. In the Render dashboard add:

| Variable | Value |
| --- | --- |
| `DJANGO_SUPERUSER_USERNAME` | `admin` |
| `DJANGO_SUPERUSER_EMAIL` | your email |
| `DJANGO_SUPERUSER_PASSWORD` | a strong password |

Then trigger **Manual Deploy → Clear build cache & deploy**. `build.sh` creates the user if it doesn't exist yet.

### Step 3 — Deploy the frontend on Vercel

1. Sign up at [vercel.com](https://vercel.com) and import the same GitHub repository.
2. Set **Root Directory** to `university-web`.
3. Vercel detects Create React App automatically (`vercel.json` is already included).
4. Add an environment variable:

   | Name | Value |
   | --- | --- |
   | `REACT_APP_API_URL` | `https://<your-service>.onrender.com` |

5. Click **Deploy**.
6. Copy the resulting URL (e.g. `https://university-web.vercel.app`).

### Step 4 — Connect the two

1. Go back to Render → your service → **Environment**.
2. Set `CORS_ALLOWED_ORIGINS` to your Vercel URL:
   ```
   https://university-web.vercel.app
   ```
   To also allow Vercel preview deployments, set `CORS_ALLOWED_ORIGIN_REGEXES` to:
   ```
   ^https://university-web-.*\.vercel\.app$
   ```
3. Save — Render redeploys automatically.

### Step 5 — Verify

Open your Vercel URL and check:

- The site loads and navigation works.
- **Login** with a user that exists in the production database.
- The **Students** page lists data from the Render API.
- Registering a student succeeds.

If the Students page shows a network/CORS error, confirm `CORS_ALLOWED_ORIGINS` exactly matches the browser URL (including `https://`, no trailing slash).

### How configuration is wired

- **Backend:** all settings read from environment variables with local-friendly defaults. With no variables set, the project runs on SQLite with `DEBUG=True` exactly as before.
- **Database:** `dj-database-url` uses `DATABASE_URL` when present, otherwise `Django/UniversityHub/db.sqlite3`.
- **Static files:** WhiteNoise serves Django admin/static assets in production; `collectstatic` runs during the build.
- **Frontend:** `src/config.js` centralizes the API base URL. It uses `REACT_APP_API_URL`, falling back to `http://127.0.0.1:8000`.

### Deployment files reference

| File | Purpose |
| --- | --- |
| `render.yaml` | Render Blueprint: service, build/start commands, env vars |
| `.github/workflows/render-deploy.yml` | Calls the Render deploy hook on backend changes to `main` |
| `Django/UniversityHub/build.sh` | Install deps, collect static, migrate, optional superuser |
| `Django/UniversityHub/requirements.txt` | Adds `gunicorn`, `psycopg`, `whitenoise`, `dj-database-url` |
| `university-web/vercel.json` | CRA framework preset + SPA rewrite for client-side routing |
| `Django/UniversityHub/.env.example` | Backend variables reference |
| `university-web/.env.example` | Frontend variables reference |

### Deploying elsewhere

- **Railway / Fly.io / Heroku:** use the same `build.sh` as the release command and `gunicorn UniversityHub.wsgi:application` as the start command, with `DATABASE_URL` pointing at any Postgres instance.
- **PythonAnywhere:** set the WSGI file to `UniversityHub.wsgi.application` and run `migrate`/`collectstatic` in a console. SQLite works there because the disk is persistent.
- **Any static host for the frontend:** run `npm run build` with `REACT_APP_API_URL` set and upload the `build/` folder.

---

## Known Limitations

- The API base URL is configurable via `REACT_APP_API_URL`; without it the app defaults to `http://127.0.0.1:8000`.
- Media uploads (profile pictures, syllabus files) are stored on local disk, which is **ephemeral** on Render's free tier. Use S3/Cloudinary for durable uploads in production.
- No automated tests cover the API or the UI beyond the default Create React App test.

---

## License

This project is intended for educational use.
