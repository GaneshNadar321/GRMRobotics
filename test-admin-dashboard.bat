@echo off
echo ========================================
echo    Testing Admin Dashboard Issues
echo ========================================
echo.

echo Testing if the issues are fixed:
echo.

echo 1. Testing Messages API...
curl -s http://localhost:3001/api/admin/messages?status=unread ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi0xMjM0Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMxMDA2NjAwfQ.placeholder" ^
  | findstr "subject" > nul
if %errorlevel% equ 0 (
    echo ✅ Messages API working
) else (
    echo ❌ Messages API not working
)

echo.
echo 2. Testing Dashboard Stats API...
curl -s http://localhost:3001/api/admin/dashboard ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi0xMjM0Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMxMDA2NjAwfQ.placeholder" ^
  | findstr "totalOrders" > nul
if %errorlevel% equ 0 (
    echo ✅ Dashboard Stats API working
) else (
    echo ❌ Dashboard Stats API not working
)

echo.
echo 3. Checking Frontend Build...
if exist "frontend\.next\server\app\admin\messages\page.js" (
    echo ✅ Admin Messages page built successfully
) else (
    echo ❌ Admin Messages page not built
)

echo.
echo 4. Checking if servers are running...
netstat -an | findstr ":3000" > nul
if %errorlevel% equ 0 (
    echo ✅ Frontend server running on port 3000
) else (
    echo ❌ Frontend server not running
)

netstat -an | findstr ":3001" > nul
if %errorlevel% equ 0 (
    echo ✅ Backend server running on port 3001
) else (
    echo ❌ Backend server not running
)

echo.
echo ========================================
echo    Manual Testing Instructions
echo ========================================
echo.
echo To test the fixes manually:
echo.
echo 1. Open browser: http://localhost:3000/admin
echo 2. Login with: admin@grmrobotics.com / admin123
echo 3. Check sidebar - should show real message count (not "3")
echo 4. Click on "Messages" - should open messages page (not 404)
echo 5. Check "Orders" section - should show real orders
echo 6. Verify badge counts update automatically
echo.
echo If you see any issues:
echo - Check browser console for errors
echo - Verify both servers are running
echo - Check if test data was created properly
echo.
pause