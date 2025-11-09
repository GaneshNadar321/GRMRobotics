@echo off
echo ========================================
echo    Configuring All Ports to Use 3000 Setup
echo ========================================
echo.

echo 🔧 Port Configuration:
echo - Frontend: Port 3000 (http://localhost:3000)
echo - Backend:  Port 3001 (http://localhost:3001)
echo - Admin:    Port 3000 (http://localhost:3000/admin)
echo.

echo 📋 Configuration Files Updated:
echo ✅ frontend/.env.local - PORT=3000 added
echo ✅ backend/.env - PORT=3001, FRONTEND_URL=http://localhost:3000
echo ✅ backend/src/server.ts - CORS configured for localhost:3000
echo.

echo 🔧 Stopping any existing servers...
echo.

REM Kill any Node.js processes that might be using the ports
tasklist /FI "IMAGENAME eq node.exe" /FO CSV | findstr /V "INFO:" > nul
if %errorlevel% equ 0 (
    echo Found Node.js processes, attempting to stop them...
    taskkill /IM node.exe /F > nul 2>&1
    echo Node.js processes stopped
) else (
    echo No Node.js processes found
)

echo.
echo 🚀 Starting servers with correct port configuration...
echo.

echo Starting Backend (Port 3001)...
start "GRM Backend" cmd /c "cd /d \"%~dp0backend\" && echo Backend starting on port 3001... && npm run dev"

echo Waiting 4 seconds for backend to initialize...
timeout /t 4 /nobreak > nul

echo.
echo Starting Frontend (Port 3000)...
start "GRM Frontend" cmd /c "cd /d \"%~dp0frontend\" && echo Frontend starting on port 3000... && set PORT=3000 && npm run dev"

echo.
echo ⏳ Waiting for servers to start completely...
timeout /t 8 /nobreak > nul

echo.
echo 🧪 Testing server connectivity...
echo.

REM Test backend
powershell -Command "try { Invoke-RestMethod -Uri 'http://localhost:3001/api/health' -TimeoutSec 5 | Out-Null; Write-Host '✅ Backend (3001) - OK' } catch { Write-Host '❌ Backend (3001) - Not responding' }"

REM Test frontend (just check if port is listening)
netstat -an | findstr ":3000.*LISTENING" > nul
if %errorlevel% equ 0 (
    echo ✅ Frontend (3000) - OK
) else (
    echo ❌ Frontend (3000) - Not listening
)

echo.
echo 🌐 URLs to use:
echo.
echo 📱 Frontend:    http://localhost:3000
echo 🔧 Admin Panel: http://localhost:3000/admin
echo 🔌 Backend API: http://localhost:3001/api
echo 🏥 Health Check: http://localhost:3001/api/health
echo.

echo 🎯 Login Credentials:
echo Admin: admin@grmrobotics.com / admin123
echo Customer: customer@example.com / customer123
echo.

echo Opening admin panel in 3 seconds...
timeout /t 3 /nobreak > nul
start http://localhost:3000/admin

echo.
echo ✅ Configuration complete! 
echo.
echo Both servers should now be running on the correct ports:
echo - Frontend: http://localhost:3000
echo - Backend:  http://localhost:3001
echo.
echo If you still get 404 errors, check:
echo 1. Both server windows are running without errors
echo 2. No firewall is blocking the ports
echo 3. Browser cache is cleared (Ctrl+F5)
echo.
pause