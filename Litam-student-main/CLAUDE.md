# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

College Management Website (LITAM) - A full-stack college management system with React.js frontend and Django REST Framework backend using MySQL.

## Architecture

```
college website/
├── backend/           # Django REST API
│   ├── core/          # Django settings, URLs, WSGI
│   │   ├── settings.py
│   │   └── urls.py    # Main URL routing
│   ├── apps/          # Django applications
│   │   ├── accounts/  # Custom User model, auth (JWT)
│   │   ├── faculty/   # Faculty profiles
│   │   ├── students/  # Student resources, dashboard
│   │   ├── courses/   # Course catalog
│   │   ├── notices/   # Announcements
│   │   └── gallery/   # Campus images
│   └── media/         # Uploaded files
└── frontend/          # React.js SPA
    └── src/
        ├── components/    # Navbar, Footer, PrivateRoute
        ├── pages/        # Route components
        │   ├── Auth/     # Login, Register
        │   └── Dashboards/
        └── services/     # API client (axios)
```

## Commands

### Backend (from `backend/` directory)
```bash
# Activate virtual environment
.venv/Scripts/activate    # Windows

# Run development server
python manage.py runserver

# Database migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
```

### Frontend (from `frontend/` directory)
```bash
npm install     # Install dependencies
npm start       # Development server (port 3000)
npm run build   # Production build
```

## Key Configuration

- **Backend runs on**: `localhost:8000`
- **Frontend runs on**: `localhost:3000`
- **API base URL**: `http://localhost:8000/api/`
- **Database**: MySQL `college_db` (user: root, password: root)
- **Auth**: JWT via `rest_framework_simplejwt`
- **Custom User Model**: `apps.accounts.User`

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/faculty/` | List all faculty |
| `GET /api/courses/` | List all courses |
| `GET /api/notices/` | List announcements |
| `GET /api/gallery/` | List gallery images |
| `GET /api/students/` | Student resources |
| `POST /api/auth/login/` | User login |
| `POST /api/auth/register/student/` | Student registration |
| `POST /api/auth/register/faculty/` | Faculty registration |

## Tech Stack

- **Frontend**: React 18, React Router 6, Axios, Tailwind CSS, Lucide icons, Chart.js
- **Backend**: Django 4.x, Django REST Framework, SimpleJWT, django-cors-headers, MySQL
- **Media**: Pillow for image handling

## Django Apps Structure

Each app in `backend/apps/` follows standard Django pattern:
- `models.py` - Data models
- `serializers.py` - DRF serializers
- `views.py` - API views/viewsets
- `urls.py` - App-level routing
- `admin.py` - Admin panel registration

## Notes

- CORS is enabled for all origins in development (`CORS_ALLOW_ALL_ORIGINS = True`)
- Media files served at `/media/` during development
- JWT tokens stored in localStorage as `access_token`