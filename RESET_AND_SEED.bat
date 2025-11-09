@echo off
cls
echo.
echo ========================================
echo   RESET DATABASE AND ADD SAMPLE DATA
echo ========================================
echo.
echo This will:
echo 1. Clear all existing data
echo 2. Reset the database
echo 3. Add fresh sample data
echo.
echo ========================================
echo.
echo Press any key to continue or close this window to cancel...
pause >nul
echo.

cd backend

echo Step 1: Resetting database...
echo.
call npx prisma migrate reset --force

echo.
echo ========================================
echo.
echo DONE! Database has been reset and seeded.
echo.
echo You now have:
echo - 6 Products
echo - 4 Users (2 admin, 2 regular)
echo - 3 Categories
echo - 2 Coupons
echo.
echo Login with:
echo Email: admin@grmrobotics.com
echo Password: Admin123!
echo.
echo ========================================
echo.
echo Now:
echo 1. Go to your browser
echo 2. Press F5 to refresh
echo 3. You should see products!
echo.
pause
