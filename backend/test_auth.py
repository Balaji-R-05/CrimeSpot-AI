from auth import get_password_hash

# Generate a hashed password for testing
test_password = "testpass123"
hashed_password = get_password_hash(test_password)
print(f"Hashed password: {hashed_password}")