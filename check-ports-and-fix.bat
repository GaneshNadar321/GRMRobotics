@echo off
echo ========================================
echo    Port Configuration Diagnostic
echo ========================================
echo.

echo Checking which ports are in use...
echo.

netstat -an | findstr ":3000" > nul
if %errorlevel% equ 0 (
    echo ❌ Port 3000 is in use
    echo    This might be causing frontend issues
) else (
    echo ✅ Port 3000 is available
)

netstat -an | findstr ":3001" > nul
if %errorlevel% equ 0 (
    echo ✅ Port 3001 is in use (Backend)
) else (
    echo ❌ Port 3001 is not in use (Backend not running?)
)

netstat -an | findstr ":3002" > nul
if %errorlevel% equ 0 (
    echo ⚠️ Port 3002 is in use (Frontend fallback)
) else (
    echo ✅ Port 3002 is available
)

echo.
echo Current Configuration:
echo - Backend should be on: http://localhost:3001
echo - Frontend should be on: http://localhost:3000
echo - Frontend is actually on: http://localhost:3002
echo.

echo 🔧 Issues this might cause:
echo 1. Frontend API calls might fail (wrong port)
echo 2. CORS issues between frontend and backend
echo 3. Authentication redirects might break
echo.

echo 💡 Solutions:
echo 1. Stop any process using port 3000
echo 2. Restart frontend on correct port 3000
echo 3. Update environment variables if needed
echo.

echo To fix:
echo 1. Close any browser tabs on localhost:3000
echo 2. Stop any other development servers
echo 3. Restart the frontend development server
echo.

echo Current URLs:
echo - Frontend: http://localhost:3002
echo - Backend:  http://localhost:3001
echo - Admin:    http://localhost:3002/admin
echo.

echo ✅ Use these URLs until port 3000 is freed up
echo.
pause