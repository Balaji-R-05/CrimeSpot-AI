from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import db
from auth import get_current_user, User
from bson import ObjectId
import os
import shutil

router = APIRouter()

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class Location(BaseModel):
    latitude: float
    longitude: float
    address: Optional[str] = None

class CrimeReport(BaseModel):
    crime_type: str
    location: Location
    description: str
    date_time: datetime
    is_anonymous: bool = False
    status: str = "pending"
    images: Optional[List[str]] = None
    audio_url: Optional[str] = None

async def save_upload_file(file: UploadFile, folder: str) -> str:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    folder_path = os.path.join(UPLOAD_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    file_path = os.path.join(folder_path, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return f"/uploads/{folder}/{filename}"

@router.post("/reports")
async def create_report(
    report: CrimeReport,
    images: Optional[List[UploadFile]] = File(None),
    audio: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user)
):
    try:
        report_dict = report.dict()
        report_dict["user_id"] = current_user.id if not report.is_anonymous else None
        report_dict["created_at"] = datetime.utcnow()

        # Handle file uploads
        if images:
            image_urls = []
            for image in images:
                image_url = await save_upload_file(image, "images")
                image_urls.append(image_url)
            report_dict["images"] = image_urls

        if audio:
            audio_url = await save_upload_file(audio, "audio")
            report_dict["audio_url"] = audio_url

        # Store in MongoDB
        result = await db.db.crime_reports.insert_one(report_dict)
        
        return {
            "message": "Report created successfully",
            "report_id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/reports/nearby")
async def get_nearby_reports(
    lat: float,
    lon: float,
    radius: float = 5000,  # meters
    current_user: User = Depends(get_current_user)
):
    pipeline = [
        {
            "$geoNear": {
                "near": {"type": "Point", "coordinates": [lon, lat]},
                "distanceField": "distance",
                "maxDistance": radius,
                "spherical": True
            }
        },
        {
            "$sort": {"date_time": -1}
        }
    ]
    
    reports = await db.db.crime_reports.aggregate(pipeline).to_list(length=50)
    return reports

