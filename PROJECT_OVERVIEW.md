# Project Overview

## Purpose
Personal portfolio application - a full-stack web application showcasing projects and information.

## Tech Stack

### Backend
- **Framework**: Flask 3.0.2 (Python 3.12)
- **Server**: Gunicorn (production)
- **Dev Tools**: pytest, black, flake8

### Frontend
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Node Version**: 20.x
- **Code Quality**: ESLint, Prettier

### DevOps
- **Containerization**: Docker + Docker Compose
- **Build Strategy**: Multi-stage Docker build

## Project Structure

```
johnmgibson/
├── backend/               # Python Flask application
│   ├── app/              # Main application code
│   ├── run.py            # Application entry point
│   ├── requirements.txt  # Python dependencies
│   └── venv/             # Virtual environment
│
├── frontend/             # React TypeScript application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── layouts/      # Layout components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   ├── utils/        # Utility functions
│   │   └── types/        # TypeScript type definitions
│   ├── public/           # Static assets
│   ├── package.json      # Node dependencies
│   └── vite.config.ts    # Vite configuration
│
├── Dockerfile            # Multi-stage build definition
├── docker-compose.yml    # Container orchestration
└── .dockerignore         # Docker ignore rules
```

## How to Run

### Option 1: Docker (Recommended for Production)
```bash
# Build and run both frontend and backend
docker-compose up --build

# Access at http://localhost:5000
```

### Option 2: Development Mode (Separate Servers)

**Backend (Terminal 1):**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m flask run --debug
# Runs on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173 (or similar)
```

## Architecture Notes

### Request Flow
1. Client requests → Flask backend (port 5000)
2. Flask serves React SPA as static files
3. React handles client-side routing
4. API calls go back to Flask endpoints

### Key Design Decisions
- **Monorepo Structure**: Frontend and backend in same repository for simplicity
- **Static File Serving**: Flask serves the built React app in production
- **TypeScript**: Type safety for frontend code
- **Docker Multi-stage**: Separate build stages for frontend and backend optimization
- **Development vs Production**: Separate dev servers for hot-reload, unified Docker for production

## Environment & Configuration

### Backend Configuration
- Flask runs in debug mode for development
- Gunicorn serves production traffic
- Static files served from `frontend/dist` after build

### Frontend Configuration
- Vite for fast development and optimized builds
- Tailwind CSS for utility-first styling
- ESLint + Prettier for code consistency

## Common Tasks

### Adding a New Frontend Component
```bash
cd frontend/src/components
# Create your component file
# Import and use in pages
```

### Adding a New Backend Route
```bash
cd backend/app
# Add route in appropriate module
# Update any necessary models/services
```

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Code Formatting
```bash
# Backend
cd backend
black .
flake8 .

# Frontend
cd frontend
npm run lint
npm run format
```

## Important Context for AI Assistants

### When Making Changes
1. **Backend changes**: Modify Python files in `backend/app/`, restart Flask server
2. **Frontend changes**: Modify files in `frontend/src/`, Vite hot-reloads automatically
3. **Dependencies**:
   - Backend: Update `requirements.txt` and run `pip install -r requirements.txt`
   - Frontend: Update `package.json` and run `npm install`
4. **Docker**: After significant changes, rebuild with `docker-compose up --build`

### Code Style
- **Python**: Follow PEP 8, use black for formatting
- **TypeScript/React**: Follow ESLint rules, use Prettier for formatting
- **Git**: Main branch is `main`

### Current State
- Clean working directory (no uncommitted changes at conversation start)
- Recent work includes Docker configuration and Flask app refactoring
- Frontend serves from Flask in production mode

## Git Workflow
```bash
# Check status
git status

# Create feature branch
git checkout -b feature/your-feature-name

# Stage and commit changes
git add .
git commit -m "Description of changes"

# Push to remote (if you have permissions)
git push origin feature/your-feature-name
```

## Troubleshooting

### Port Already in Use
- Backend: `lsof -ti:5000 | xargs kill -9`
- Frontend: `lsof -ti:5173 | xargs kill -9`

### Docker Issues
```bash
# Clean up containers and rebuild
docker-compose down
docker-compose up --build

# Remove all containers/images/volumes
docker system prune -a --volumes
```

### Dependencies Not Installing
- **Python**: Ensure venv is activated, check Python version (3.12)
- **Node**: Ensure Node 20.x is installed, clear `node_modules` and reinstall

## Resources
- Flask Documentation: https://flask.palletsprojects.com/
- React Documentation: https://react.dev/
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
