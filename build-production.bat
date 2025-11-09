@echo off
echo 🚀 Building GRM Robotics for Production...
echo.

echo 📦 Building Backend...
cd backend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Backend build failed!
    pause
    exit /b 1
)
echo ✅ Backend build successful!
echo.

echo 🎨 Building Frontend...
cd ../frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
echo ✅ Frontend build successful!
echo.

echo 🎉 Production build completed successfully!
echo.
echo 📁 Build outputs:
echo   - Backend: backend/dist/
echo   - Frontend: frontend/.next/
echo.
echo 🚀 Ready for deployment!
pause