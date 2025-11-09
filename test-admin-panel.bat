@echo off
echo ========================================
echo    Testing Professional Admin Panel
echo ========================================
echo.

echo [1/3] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo [2/3] Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo [3/3] Opening Admin Panel...
timeout /t 10 /nobreak > nul
start http://localhost:3000/admin

echo.
echo ========================================
echo    🎨 Professional Admin Panel Ready!
echo ========================================
echo.
echo Test Features:
echo.
echo 1. Dashboard:
echo    ✅ Modern stats cards with gradients
echo    ✅ Interactive alerts with actions
echo    ✅ Enhanced recent orders table
echo    ✅ Professional quick action cards
echo.
echo 2. Notifications System:
echo    ✅ Click bell icon to see notifications
echo    ✅ Unread count badge (shows 2)
echo    ✅ Mark as read functionality
echo    ✅ Action links to relevant pages
echo    ✅ Remove notifications
echo.
echo 3. Sidebar Navigation:
echo    ✅ Collapsible sidebar (click arrow)
echo    ✅ Organized menu sections
echo    ✅ Real notification badges
echo    ✅ Smooth animations
echo.
echo 4. Product Management:
echo    ✅ Advanced search and filters
echo    ✅ Professional product table
echo    ✅ Image previews
echo    ✅ Stock level indicators
echo    ✅ Multiple action buttons
echo.
echo 5. Order Management:
echo    ✅ Complete order listing
echo    ✅ Status management
echo    ✅ Search and filters
echo    ✅ Customer information
echo.
echo 6. Analytics Dashboard:
echo    ✅ Key performance metrics
echo    ✅ Growth indicators
echo    ✅ Professional charts layout
echo.
echo 7. Upload Functionality:
echo    ✅ Tutorial creation with forms
echo    ✅ Manual PDF upload
echo    ✅ File validation
echo    ✅ Professional modals
echo.
echo Navigation Test:
echo • Go to http://localhost:3000/admin
echo • Login as admin
echo • Test sidebar collapse/expand
echo • Try product management
echo • Test tutorial/manual uploads
echo • Check responsive design
echo.
echo Press any key to stop servers...
pause > nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Test complete!
pause