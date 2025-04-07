# Fictional Product

A full-stack web application built with React (TypeScript) and FastAPI (Python).

## Tech Stack

### Frontend
- React 18
- TypeScript
- React Router DOM
- SASS for styling
- Vite as build tool

### Backend
- FastAPI
- SQLAlchemy for database ORM
- Pydantic for data validation
- Python-dotenv for environment variables
- Uvicorn as ASGI server

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package installer)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- On Windows:
```bash
.\venv\Scripts\activate
```
- On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory with the following content:
```env
DATABASE_URL=sqlite:///./app.db
SECRET_KEY=your_secret_key_here
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/fictional-product
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

1. Make sure your virtual environment is activated
2. Navigate to the backend directory
3. Run:
```bash
uvicorn src.main:app --reload
```
The API will be available at `http://localhost:8000`

### Start the Frontend Development Server

1. Navigate to the frontend/fictional-product directory
2. Run:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## Development Commands

### Frontend

- Start development server:
```bash
npm run dev
```

- Build for production:
```bash
npm run build
```

- Preview production build:
```bash
npm run serve
```

### Backend

- Start development server:
```bash
uvicorn src.main:app --reload
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   └── users.py
│   │   ├── models/
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   └── user.py
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── runtime.txt
│   └── .env
│
└── frontend/
    └── fictional-product/
        ├── src/
        │   ├── components/
        │   │   ├── Home.tsx
        │   │   ├── Home.scss
        │   │   ├── LoginForm.tsx
        │   │   └── LoginForm.scss
        │   ├── App.tsx
        │   ├── main.tsx
        │   └── index.css
        ├── package.json
        ├── vercel.json
        └── vite.config.ts
```

## Features

- User authentication system
- Responsive design with SASS styling
- Form validation
- Database integration with SQLAlchemy
- RESTful API endpoints with FastAPI
- TypeScript support for better development experience

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Live Demo

- Frontend: [https://fictional-product.vercel.app](https://fictional-product.vercel.app)
- Backend API: [https://fictional-product-api.herokuapp.com](https://fictional-product-api.herokuapp.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details