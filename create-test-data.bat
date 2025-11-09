@echo off
echo ========================================
echo    Creating Test Data for Admin Dashboard
echo ========================================
echo.

echo [1/2] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo [2/2] Running Database Seed...
call npm run seed
if %errorlevel% neq 0 (
    echo ❌ Database seeding failed
    echo Make sure PostgreSQL is running and DATABASE_URL is correct
    pause
    exit /b 1
)

echo ✅ Test data created successfully!

echo.
echo ========================================
echo    🎉 Test Data Created!
echo ========================================
echo.
echo Test data includes:
echo • Sample products with categories
echo • Test users (admin and customers)
echo • Sample orders with different statuses
echo • Product reviews and ratings
echo • Coupons and discounts
echo • Sample manuals and tutorials
echo.
echo Admin Login:
echo • Email: admin@grmrobotics.com
echo • Password: admin123
echo.
echo Customer Login:
echo • Email: customer@example.com
echo • Password: customer123
echo.
echo Now you can:
echo 1. Login as admin at http://localhost:3000/admin
echo 2. See real orders in the dashboard
echo 3. Test all admin functionality
echo 4. View statistics and analytics
echo.
echo Press any key to continue...
pause > nul

echo Opening admin dashboard...
start http://localhost:3000/admin

echo.
echo Test complete! Backend server is still running.
echo Press any key to stop the backend server...
pause > nul

taskkill /f /im node.exe 2>nul
echo Backend server stopped.
pause