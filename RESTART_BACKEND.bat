@echo off
echo ========================================
echo   RESTARTING BACKEND SERVER
echo ========================================
echo.

echo Stopping backend server...
taskkill /F /FI "WINDOWTITLE eq Backend Server*" 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo ========================================
echo   BACKEND RESTARTING...
echo ========================================
echo.
echo Backend: http://localhost:3001
echo.
echo Press any key to close this window...
pause >nul
