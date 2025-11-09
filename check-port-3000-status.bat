@echo off
echo ========================================
echo    Port 3000 Configuration Status
echo ========================================
echo.

echo 🔍 Checking port status...
echo.

REM Check port 3000 (Frontend)
netstat -an | findstr ":3000.*LISTENING" > nul
if %errorlevel% equ 0 (
    echo ✅ Port 3000: Frontend is running
    echo    URL: http://localhost:3000
) else (
    echo ❌ Port 3000: Frontend not running
    echo    Run: configure-ports-3000.bat to start
)

echo.

REM Check port 3001 (Backend)
netstat -an | findstr ":3001.*LISTENING" > nul
if %errorlevel% equ 0 (
    echo ✅ Port 3001: Backend is running
    echo    URL: http://localhost:3001/api
) else (
    echo ❌ Port 3001: Backend not running
    echo    Run: configure-ports-3000.bat to start
)

echo.

REM Test API connectivity
echo 🧪 Testing API connectivity...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/health' -TimeoutSec 3; Write-Host '✅ Backend API: Responding'; Write-Host '   Status:' $response.status } catch { Write-Host '❌ Backend API: Not responding' }"

echo.

REM Check if any other processes are using port 3000
echo 🔍 Checking what's using port 3000...
for /f "tokens=2,5" %%a in ('netstat -ano ^| findstr :3000') do (
    if "%%a"=="0.0.0.0:3000" (
        echo    Process ID %%b is using port 3000
        for /f "tokens=1" %%c in ('tasklist /FI "PID eq %%b" /FO CSV /NH') do (
            echo    Process: %%c
        )
    )
)

echo.
echo 📋 Current Configuration:
echo - Frontend should be on: http://localhost:3000
echo - Backend should be on:  http://localhost:3001
echo - Admin panel at:        http://localhost:3000/admin
echo.

echo 🔧 If servers are not running, use:
echo    configure-ports-3000.bat
echo.

echo 🌐 If servers are running, test these URLs:
echo    http://localhost:3000 (Frontend)
echo    http://localhost:3000/admin (Admin Panel)
echo    http://localhost:3001/api/health (Backend Health)
echo.
pause