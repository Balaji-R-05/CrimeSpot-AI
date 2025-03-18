from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Dict, Optional, List

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

@app.get("/")
def home():
    return {"message": "CrimeSpot API is Running Successfully!"}

@app.post("/report-crime")
async def report_crime(crime_report: CrimeReport):
    try:
        # TODO: Add MongoDB integration here
        # For now, just print the report and return success
        print(f"Received crime report: {crime_report}")
        return {"message": "Crime report submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
