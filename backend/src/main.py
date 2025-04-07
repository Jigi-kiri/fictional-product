from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from src.database import engine, Base
from src.api.users import router as users_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fictional Product API")

# Configure CORS
allowed_origins = [
    "http://localhost:5173",  # Local development
    "https://fictional-product.vercel.app",  # Production frontend
]

# Add custom origin from environment variable if provided
if os.getenv("FRONTEND_URL"):
    allowed_origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)