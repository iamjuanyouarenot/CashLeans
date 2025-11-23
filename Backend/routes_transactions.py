from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

import schemas
import crud
import models
from database import get_db
from auth import get_current_user

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.post("/", response_model=schemas.TransactionOut)
def create_transaction(
    tx: schemas.TransactionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_transaction(db, current_user.id, tx)


@router.get("/", response_model=List[schemas.TransactionOut])
def list_transactions(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_transactions(db, current_user.id)
