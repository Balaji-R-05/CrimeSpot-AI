from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import GEOSPHERE

class Database:
    client = None
    db = None

    @classmethod
    async def connect(cls):
        cls.client = AsyncIOMotorClient("mongodb://localhost:27017")
        cls.db = cls.client.crimespot
        
        # Create indexes
        await cls.db.users.create_index("username", unique=True)
        await cls.db.users.create_index("email", unique=True)
        await cls.db.crime_reports.create_index([("location", GEOSPHERE)])
        await cls.db.crime_reports.create_index("dateTime")

    @classmethod
    async def close(cls):
        if cls.client:
            cls.client.close()


