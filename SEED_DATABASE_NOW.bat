@echo off
cls
echo.
echo ========================================
echo   SEEDING DATABASE - PLEASE WAIT
echo ========================================
echo.
echo This will add:
echo - 6 Products
echo - 4 Users (2 admin, 2 regular)
echo - 3 Categories
echo - 2 Coupons
echo.
echo ========================================
echo.

cd backend

echo Running seed command...
echo.

call npm run seed

echo.
echo ========================================
echo.
echo DONE! Now you can:
echo.
echo 1. Refresh your browser (press F5)
echo 2. Login with:
echo    Email: admin@grmrobotics.com
echo    Password: Admin123!
echo.
echo ========================================
echo.
pause
