@echo off
echo ========================================
echo    Fixing 404 Errors - Port Issues
echo ========================================
echo.

echo 🔍 Diagnosing 404 errors...
echo.

echo Current server status:
echo ✅ Backend running on: http://localhost:3001
echo ⚠️ Frontend running on: http://localhost:3002 (should be 3000)
echo.

echo 🔧 The 404 errors are likely caused by:
echo 1. Frontend running on wrong port (3002 instead of 3000)
echo 2. API calls might be failing due to port mismatch
echo 3. Static resources not loading correctly
echo.

echo 💡 Quick Fix - Use the correct URLs:
echo.
echo ✅ WORKING URLS:
echo - Frontend: http://localhost:3002
echo - Admin Panel: http://localhost:3002/admin
echo - Backend API: http://localhost:3001/api
echo.

echo 🧪 Test these URLs:
echo 1. Frontend: http://localhost:3002
echo 2. Admin Login: http://localhost:3002/admin
echo 3. API Health: http://localhost:3001/api/health
echo.

echo 🔧 To fix permanently:
echo 1. Close any browser tabs on localhost:3000
echo 2. Stop any other development servers using port 3000
echo 3. Kill any Node.js processes using port 3000
echo 4. Restart frontend server (it will use port 3000)
echo.

echo 📋 Commands to free up port 3000:
echo netstat -ano ^| findstr :3000
echo taskkill /PID [PID_NUMBER] /F
echo.

echo ✅ For now, use http://localhost:3002 for all frontend access
echo.

echo Opening the working admin panel...
start http://localhost:3002/admin
echo.
pause