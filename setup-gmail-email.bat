@echo off
echo 📧 Gmail Email Setup for GRM Robotics
echo =====================================
echo.
echo This script will help you set up Gmail for your GRM Robotics platform.
echo.
echo 📋 Before proceeding, make sure you have:
echo    1. A Gmail account (personal or business)
echo    2. 2-Factor Authentication enabled
echo    3. Generated an App Password
echo.
echo 🔗 Quick Links:
echo    - Google Account: https://myaccount.google.com
echo    - 2FA Setup: https://myaccount.google.com/security
echo    - App Passwords: https://myaccount.google.com/apppasswords
echo.
pause
echo.

echo 📝 Please provide your Gmail details:
echo.

set /p GMAIL_ADDRESS="Enter your Gmail address (e.g., grmrobotics.business@gmail.com): "
set /p APP_PASSWORD="Enter your 16-character App Password (e.g., abcd efgh ijkl mnop): "

echo.
echo 📄 Updating your .env file...

cd backend

echo # Email Configuration - Gmail >> .env
echo EMAIL_FROM="%GMAIL_ADDRESS%" >> .env
echo EMAIL_HOST="smtp.gmail.com" >> .env
echo EMAIL_PORT="587" >> .env
echo EMAIL_USER="%GMAIL_ADDRESS%" >> .env
echo EMAIL_PASS="%APP_PASSWORD%" >> .env

echo.
echo ✅ Email configuration added to backend/.env
echo.
echo 🧪 Testing email configuration...
echo.

node test-email.js

echo.
echo 📋 Setup complete! Your Gmail is now configured for GRM Robotics.
echo.
pause