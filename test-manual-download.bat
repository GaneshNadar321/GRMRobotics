@echo off
echo ========================================
echo    Testing Manual Download Functionality
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
start http://localhost:3000/admin/manuals

echo.
echo ========================================
echo    📁 Manual Download Test Ready!
echo ========================================
echo.
echo Test Instructions:
echo.
echo 1. Login as Admin:
echo    - Go to http://localhost:3000/login
echo    - Use admin credentials
echo.
echo 2. Upload a Test Manual:
echo    - Go to Admin > Manuals
echo    - Click "Upload Manual"
echo    - Fill in details:
echo      * Title: "Test User Manual"
echo      * Description: "Test manual for download"
echo      * Version: "1.0"
echo    - Upload any PDF file
echo    - Click "Upload Manual"
echo.
echo 3. Test Download:
echo    - Find the uploaded manual in the list
echo    - Click the download button (arrow down icon)
echo    - Verify the PDF downloads correctly
echo    - Check the filename is correct
echo.
echo 4. Verify Download Features:
echo    ✅ Download button works
echo    ✅ File downloads with correct name
echo    ✅ PDF opens properly
echo    ✅ No errors in browser console
echo.
echo Download Endpoints:
echo • Admin Download: /api/admin/manuals/:id/download
echo • Public Download: /api/manuals/:id/download
echo • Static Files: /uploads/filename.pdf
echo.
echo Troubleshooting:
echo • Check backend/uploads folder for files
echo • Verify file permissions
echo • Check browser download settings
echo • Look for errors in browser console
echo.
echo Press any key to stop servers...
pause > nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Test complete!
pause