from auth import get_password_hash
from database import Database
import asyncio

async def create_test_user():
    await Database.connect()
    
    test_user = {
        "username": "testuser",
        "email": "test@example.com",
        "hashed_password": get_password_hash("testpass123"),
        "full_name": "Test User",
        "disabled": False
    }
    
    try:
        # Delete existing user if any
        await Database.db.users.delete_one({"username": "testuser"})
        # Create new test user
        result = await Database.db.users.insert_one(test_user)
        print("Test user created successfully")
        print("User ID:", result.inserted_id)
    except Exception as e:
        print(f"Error creating test user: {e}")
    finally:
        await Database.close()

if __name__ == "__main__":
    asyncio.run(create_test_user())