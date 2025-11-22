from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routes_auth import router as auth_router
from .routes_transactions import router as tx_router
from .routes_receipts import router as receipts_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CashLeans API")

origins = [
    "http://localhost:5173",  # Vite
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(tx_router)
app.include_router(receipts_router)
