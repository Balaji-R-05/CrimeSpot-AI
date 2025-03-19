from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Dict, Optional, List
import base64

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Location(BaseModel):
    latitude: str
    longitude: str

class CrimeReport(BaseModel):
    crimeType: str
    location: Location
    description: str
    dateTime: str
    images: Optional[List[str]] = None  # Base64 encoded images
    audioDescription: Optional[str] = None  # Base64 encoded audio
    isAnonymous: bool = False
    status: str = "pending"  # pending, investigating, resolved
    reportTemplate: Dict = {}  # Dynamic fields based on crime type

@app.get("/")
def home():
    return {"message": "CrimeSpot API is Running Successfully!"}

@app.post("/report-crime")
async def report_crime(crime_report: CrimeReport):
    try:
        # TODO: Add MongoDB integration
        print(f"Received crime report: {crime_report}")
        return {
            "message": "Crime report submitted successfully",
            "reportId": "12345",  # Generate unique ID in production
            "status": crime_report.status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/report-templates/{crime_type}")
async def get_report_template(crime_type: str):
    templates = {
        "theft": {
            "itemType": "string",
            "estimatedValue": "number",
            "timeOfTheft": "datetime",
            "suspectDescription": "text"
        },
        "assault": {
            "weaponInvolved": "boolean",
            "injurySeverity": "select:minor,moderate,severe",
            "suspectDescription": "text",
            "witnessPresent": "boolean"
        },
        # Add more templates as needed
    }
    return templates.get(crime_type, {})

@app.get("/report-status/{report_id}")
async def get_report_status(report_id: str):
    # Mock status response
    return {
        "reportId": report_id,
        "status": "investigating",
        "lastUpdated": datetime.now().isoformat(),
        "comments": ["Investigation initiated", "Officer assigned"]
    }

@app.get("/crimes")
async def get_crimes(timeRange: str = "week"):
    try:
        # Calculate the date range
        now = datetime.now()
        if timeRange == "day":
            start_date = now - timedelta(days=1)
        elif timeRange == "week":
            start_date = now - timedelta(weeks=1)
        elif timeRange == "month":
            start_date = now - timedelta(days=30)
        elif timeRange == "year":
            start_date = now - timedelta(days=365)
        else:
            raise HTTPException(status_code=400, detail="Invalid time range")

        # Mock data for Chennai
        mock_data = [
            {
                "crimeType": "theft",
                "location": {"latitude": "13.0827", "longitude": "80.2707"},
                "description": "Mobile phone theft near Central Station",
                "dateTime": (now - timedelta(hours=2)).isoformat()
            },
            {
                "crimeType": "vandalism",
                "location": {"latitude": "13.0569", "longitude": "80.2425"},
                "description": "Property damage in T Nagar",
                "dateTime": (now - timedelta(days=2)).isoformat()
            },
            {
                "crimeType": "assault",
                "location": {"latitude": "13.1067", "longitude": "80.2847"},
                "description": "Street fight in Anna Nagar",
                "dateTime": (now - timedelta(days=1)).isoformat()
            },
            # Add more Chennai-based mock data as needed
        ]

        return mock_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
