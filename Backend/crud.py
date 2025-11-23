from sqlalchemy.orm import Session

import models
import schemas
from auth import get_password_hash


def create_user(db: Session, user: schemas.UserCreate):
    hashed = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed,
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_transaction(db: Session, user_id: int, tx: schemas.TransactionCreate):
    db_tx = models.Transaction(
        user_id=user_id,
        amount=tx.amount,
        type=tx.type,
        category=tx.category,
        description=tx.description,
        date=tx.date
    )
    db.add(db_tx)
    db.commit()
    db.refresh(db_tx)
    return db_tx


def get_transactions(db: Session, user_id: int):
    return (
        db.query(models.Transaction)
        .filter(models.Transaction.user_id == user_id)
        .all()
    )
