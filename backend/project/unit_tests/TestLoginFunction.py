import unittest

import os
from dotenv import load_dotenv
load_dotenv()
import sys
sys.path.append('/Users/wbagger/Documents/cmpe352/bounswe2024group2/backend/project')
print(sys.path)
from app.views import login

app_user_pass = os.getenv('APP_USER_PASS')

class TestLoginFunction(unittest.TestCase):

    def test_login_success(self):
        # Test case for successful login
        request_json = {
            "username": "irem17",
            "password": "{app_user_pass}"
        }
        response = login(request_json)
        self.assertEqual(response['status'], 'success')
        self.assertEqual(response['message'], 'Login successful')

    def test_login_failure(self):
        # Test case for failed login
        request_json = {
            "username": "invalid_username",
            "password": "invalid_password"
        }
        response = login(request_json)
        self.assertEqual(response['status'], 'error')
        self.assertEqual(response['message'], 'Invalid username or password')

if __name__ == '__main__':
    unittest.main()
