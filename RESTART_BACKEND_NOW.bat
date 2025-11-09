@echo off
echo ========================================
echo   RESTARTING BACKEND SERVER
echo ========================================
echo.

echo Stopping backend server...
taskkill /F /FI "WINDOWTITLE eq Backend Server*" 2>nul
taskkill /F /FI "WINDOWTITLE eq *backend*" 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo ========================================
echo   BACKEND RESTARTED!
echo ========================================
echo.
echo Backend: http://localhost:3001
echo.
echo The nodemailer error should be gone now!
echo.
pause
