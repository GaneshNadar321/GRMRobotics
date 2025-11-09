@echo off
echo ========================================
echo    Testing Admin Upload Functionality
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
echo [3/3] Opening Admin Dashboard...
timeout /t 10 /nobreak > nul
start http://localhost:3000/admin

echo.
echo ========================================
echo    🎉 Admin Upload Test Ready!
echo ========================================
echo.
echo Test Instructions:
echo.
echo 1. Login as Admin:
echo    - Go to http://localhost:3000/login
echo    - Use admin credentials
echo.
echo 2. Test Tutorial Upload:
echo    - Go to Admin > Tutorials
echo    - Click "Add Tutorial"
echo    - Fill in tutorial details:
echo      * Title: "Robot Assembly Tutorial"
echo      * Video URL: "https://youtube.com/watch?v=dQw4w9WgXcQ"
echo      * Duration: 15 minutes
echo    - Click "Create Tutorial"
echo.
echo 3. Test Manual Upload:
echo    - Go to Admin > Manuals
echo    - Click "Upload Manual"
echo    - Fill in manual details:
echo      * Title: "User Manual v1.0"
echo      * Description: "Complete assembly guide"
echo    - Upload a PDF file (max 10MB)
echo    - Click "Upload Manual"
echo.
echo 4. Verify Uploads:
echo    - Check if tutorials appear in the list
echo    - Check if manuals appear with download links
echo    - Verify files are saved in backend/uploads/
echo.
echo Press any key to stop test servers...
pause > nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Test complete!
pause