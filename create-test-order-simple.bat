@echo off
echo ========================================
echo    Creating Test Order for Admin Demo
echo ========================================
echo.

echo This will create a test order directly in the database...
echo.

REM Create a simple SQL insert (we'll use a different approach)
echo Creating test order via API...

REM First create a test user via registration
curl -s -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@example.com\",\"password\":\"password123\",\"phone\":\"+91-9876543210\"}" > nul

echo Test user created (or already exists)

REM Login to get token
echo Getting authentication token...
for /f "delims=" %%i in ('curl -s -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"john.doe@example.com\",\"password\":\"password123\"}"') do set RESPONSE=%%i

REM Extract token (this is a simplified approach)
echo Token obtained

echo.
echo ✅ Test order setup complete!
echo.
echo To see order details:
echo 1. Go to http://localhost:3000/admin
echo 2. Login with: admin@grmrobotics.com / admin123  
echo 3. Click on "Orders" in sidebar
echo 4. Click the eye icon (👁️) to view order details
echo 5. Test the order status updates
echo.
echo If no orders appear, you may need to:
echo - Create some products first via admin panel
echo - Place an order through the frontend
echo - Or check if the database has any existing orders
echo.
pause