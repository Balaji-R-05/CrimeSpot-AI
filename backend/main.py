from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Dict, Optional, List
import base64
import random
from auth import (
    Token, User, authenticate_user, create_access_token,
    get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES
)
from database import Database
import asyncio

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

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

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},  # Use user.id instead of username
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.post("/report-crime")
async def report_crime(
    crime_report: CrimeReport,
    current_user: User = Depends(get_current_active_user)
):
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

@app.get("/analytics")
async def get_analytics(timeRange: str = "month"):
    try:
        # Mock data for analytics
        crime_types = ["theft", "assault", "vandalism", "burglary", "harassment", "fraud"]
        areas = ["Anna Nagar", "T Nagar", "Adyar", "Mylapore", "Velachery"]
        
        # Generate mock data for crime types
        by_type = [
            {"name": ctype, "value": random.randint(10, 100)}
            for ctype in crime_types
        ]

        # Generate mock time series data
        now = datetime.now()
        if timeRange == "week":
            dates = [(now - timedelta(days=x)).strftime("%Y-%m-%d") for x in range(7)]
        elif timeRange == "month":
            dates = [(now - timedelta(days=x)).strftime("%Y-%m-%d") for x in range(30)]
        else:  # year
            dates = [(now - timedelta(days=x*30)).strftime("%Y-%m") for x in range(12)]

        by_time = [
            {"date": date, "count": random.randint(5, 50)}
            for date in dates
        ]

        # Generate mock data for areas
        by_area = [
            {"area": area, "count": random.randint(20, 80)}
            for area in areas
        ]

        # Generate mock resolution rate data
        resolution_rate = [
            {"status": "Resolved", "value": 65},
            {"status": "Investigating", "value": 25},
            {"status": "Pending", "value": 10}
        ]

        return {
            "byType": by_type,
            "byTime": by_time,
            "byArea": by_area,
            "resolutionRate": resolution_rate
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("startup")
async def startup_event():
    await Database.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await Database.close()
