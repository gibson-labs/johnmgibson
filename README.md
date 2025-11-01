# Personal Portfolio

A full-stack personal portfolio application built with Flask (Backend) and React + TypeScript (Frontend).   

## Project Structure
```
personal-portfolio/
├── backend/               # Flask API
│   ├── app/              # Application code
│   │   ├── routes/       # API endpoints
│   │   └── __init__.py   # App initialization
│   ├── venv/             # Python virtual environment
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile       # Backend container config
├── frontend/             # React + TypeScript frontend
│   ├── src/             # Source code
│   │   ├── components/  # Reusable UI components
│   │   │   ├── common/  # Buttons, inputs, cards, etc.
│   │   │   └── forms/   # Form-specific components
│   │   ├── layouts/     # Layout components
│   │   │   ├── Header/  # Site header
│   │   │   ├── Footer/  # Site footer
│   │   │   └── Sidebar/ # Sidebar if needed
│   │   ├── pages/       # Page components
│   │   │   ├── Home/    # Homepage
│   │   │   ├── About/   # About page
│   │   │   └── Contact/ # Contact page
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   ├── assets/      # Static assets
│   │   │   ├── images/  # Images and icons
│   │   │   └── styles/  # Global styles
│   │   ├── types/       # TypeScript type definitions
│   │   ├── services/    # API service functions
│   │   └── context/     # React Context providers
│   ├── package.json     # Node dependencies
│   └── Dockerfile       # Frontend container config
└── docker-compose.yml   # Container orchestration
```

### Frontend Directory Structure Explained

- **components/**
  - Reusable UI components that can be shared across different pages
  - Example: `Button.tsx`, `Card.tsx`, `Input.tsx`
  - Organize by feature or type (common, forms, etc.)

- **layouts/**
  - Components that define the structure of your pages
  - Each layout component should have its own folder with styles
  - Example structure:
    ```
    layouts/
    ├── Header/
    │   ├── Header.tsx
    │   ├── Header.styles.ts
    │   └── index.ts
    └── Footer/
        ├── Footer.tsx
        ├── Footer.styles.ts
        └── index.ts
    ```

- **pages/**
  - Components that represent entire pages
  - Each page should have its own folder with related components
  - Example structure:
    ```
    pages/
    ├── Home/
    │   ├── Home.tsx
    │   ├── components/
    │   │   ├── HeroSection.tsx
    │   │   └── FeaturedProjects.tsx
    │   └── index.ts
    └── About/
        ├── About.tsx
        ├── components/
        │   └── Timeline.tsx
        └── index.ts
    ```

- **hooks/**
  - Custom React hooks for shared logic
  - Example: `useWindowSize.ts`, `useAuth.ts`

- **utils/**
  - Helper functions and utilities
  - Example: `formatDate.ts`, `validation.ts`

- **assets/**
  - Static files like images, icons, and global styles
  - Use subfolders to organize by type

- **types/**
  - TypeScript interfaces and type definitions
  - Example: `types/api.ts`, `types/models.ts`

- **services/**
  - API calls and external service integrations
  - Example: `api.ts`, `auth.service.ts`

- **context/**
  - React Context providers and related logic
  - Example: `ThemeContext.tsx`, `AuthContext.tsx`

## Setup and Installation

### Backend (Flask)
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python -m flask run --debug
```

### Frontend (React + TypeScript)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## Code Quality Tools

### ESLint & Prettier Configuration
The project uses ESLint for code linting and Prettier for code formatting.

#### Available Commands
```bash
# Check for linting issues
npm run lint

# Fix linting and formatting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

#### Configuration Files
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc.json` - Prettier configuration

ESLint Rules:
```javascript
{
  "semi": true,           // Require semicolons
  "singleQuote": true,    // Use single quotes
  "jsxSingleQuote": false, // Use double quotes in JSX
  "trailingComma": "es5", // Add trailing commas
  "printWidth": 80,       // Line width
  "tabWidth": 2,         // Indentation width
  "endOfLine": "auto"    // Handle line endings automatically
}
```

## Docker Support

### Running with Docker
```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Individual Container Commands
```bash
# Build and run frontend only
docker-compose up frontend

# Build and run backend only
docker-compose up backend
```

## Development Workflow

1. Start both servers (frontend and backend)
2. Make changes to the code
3. ESLint will automatically check your code as you write
4. Run `npm run lint:fix` to automatically fix formatting issues
5. Test your changes locally
6. Commit your changes

## Troubleshooting

### Common Issues

1. **Backend server won't start**
   - Check if virtual environment is activated
   - Verify all dependencies are installed
   - Make sure no other service is using port 5000

2. **Frontend dev server issues**
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`
   - Check for port conflicts on 5173

3. **ESLint/Prettier errors**
   - Run `npm run lint:fix` to automatically fix issues
   - Check `.eslintrc.cjs` and `.prettierrc.json` for configurations
   - Make sure all dependencies are properly installed 
