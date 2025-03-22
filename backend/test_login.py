from auth import authenticate_user, fake_users_db

def test_login():
    # Test with correct credentials
    user = authenticate_user(fake_users_db, "testuser", "secret")
    print("Login with correct credentials:", "Success" if user else "Failed")

    # Test with incorrect password
    user = authenticate_user(fake_users_db, "testuser", "wrongpassword")
    print("Login with incorrect password:", "Failed" if not user else "Unexpected Success")

    # Test with non-existent user
    user = authenticate_user(fake_users_db, "nonexistent", "secret")
    print("Login with non-existent user:", "Failed" if not user else "Unexpected Success")

if __name__ == "__main__":
    test_login()