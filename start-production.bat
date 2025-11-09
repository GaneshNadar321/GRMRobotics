@echo off
echo 🚀 Starting GRM Robotics in Production Mode...
echo.

echo 📊 Starting Backend (Production)...
cd backend
start "GRM Backend" cmd /k "npm run start"
timeout /t 3 /nobreak > nul

echo 🎨 Starting Frontend (Production)...
cd ../frontend
start "GRM Frontend" cmd /k "npm run start"

echo.
echo ✅ Production servers starting...
echo.
echo 🌐 URLs:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001
echo   API:      http://localhost:3001/api
echo.
echo 📊 Monitor the opened terminal windows for logs
pause