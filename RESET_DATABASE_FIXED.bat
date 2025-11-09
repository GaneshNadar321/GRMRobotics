@echo off
cls
echo ========================================
echo RESETTING DATABASE - FIXING LOGIN
echo ========================================
echo.
echo IMPORTANT: Make sure to STOP the backend server first!
echo (Press Ctrl+C in the backend terminal)
echo.
echo Press any key when backend is stopped...
pause > nul

cd backend

echo.
echo [1/3] Cleaning up...
timeout /t 2 /nobreak > nul

echo.
echo [2/3] Resetting database...
call npx prisma migrate reset --force --skip-seed

echo.
echo [3/3] Creating admin users...
call npx ts-node src/seed.ts

echo.
echo ========================================
echo SUCCESS! Database reset complete!
echo ========================================
echo.
echo You can now:
echo 1. Start the backend server again
echo 2. Refresh your browser
echo 3. Login with:
echo.
echo    Email: admin@grmrobotics.com
echo    Password: Admin123!
echo.
echo ========================================
echo.
pause
