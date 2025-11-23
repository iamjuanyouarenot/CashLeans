from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import pytesseract
from PIL import Image
import uuid
import os

from database import get_db
from auth import get_current_user
import models

UPLOAD_DIR = "uploaded_receipts"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/receipts", tags=["receipts"])


@router.post("/upload")
async def upload_receipt(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Formato de archivo no soportado")

    file_id = f"{uuid.uuid4()}.png"
    file_path = os.path.join(UPLOAD_DIR, file_id)

    # Guardar archivo subido
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Procesar texto con OCR
    image = Image.open(file_path)
    text = pytesseract.image_to_string(image, lang="spa")

    # Guardar info en BD
    db_receipt = models.Receipt(
        user_id=current_user.id,
        file_path=file_path,
        extracted_text=text
    )
    db.add(db_receipt)
    db.commit()
    db.refresh(db_receipt)

    return {"id": db_receipt.id, "text": text}
