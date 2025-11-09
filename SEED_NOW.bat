@echo off
cls
echo ========================================
echo CREATING ADMIN USERS NOW
echo ========================================
echo.

cd backend
call npm run seed

echo.
echo ========================================
echo DONE! You can now login with:
echo.
echo Email: admin@grmrobotics.com
echo Password: Admin123!
echo ========================================
echo.
pause
