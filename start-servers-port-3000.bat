@echo off
echo ========================================
echo    Starting Servers on Correct Ports
echo ========================================
echo.

echo Killing any existing processes on ports 3000 and 3001...
echo.

REM Kill processes on port 3000 (frontend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process %%a on port 3000
    taskkill /PID %%a /F > nul 2>&1
)

REM Kill processes on port 3001 (backend)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    echo Killing process %%a on port 3001
    taskkill /PID %%a /F > nul 2>&1
)

echo.
echo Starting Backend on port 3001...
start "Backend Server" cmd /c "cd /d \"%~dp0backend\" && npm run dev"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend on port 3000...
start "Frontend Server" cmd /c "cd /d \"%~dp0frontend\" && set PORT=3000 && npm run dev"

echo.
echo ✅ Servers starting...
echo.
echo URLs:
echo - Frontend: http://localhost:3000
echo - Backend:  http://localhost:3001
echo - Admin:    http://localhost:3000/admin
echo.
echo Waiting 5 seconds then opening admin panel...
timeout /t 5 /nobreak > nul

start http://localhost:3000/admin

echo.
echo ✅ Both servers should now be running on correct ports!
echo - Frontend: Port 3000
echo - Backend:  Port 3001
echo.
pause