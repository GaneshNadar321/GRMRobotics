@echo off
echo ========================================
echo    GRM Robotics - Build Script
echo ========================================
echo.

echo [1/4] Building Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend npm install failed
    pause
    exit /b 1
)

call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)
echo ✓ Backend build completed successfully
echo.

echo [2/4] Building Frontend...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend npm install failed
    pause
    exit /b 1
)

call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed
    pause
    exit /b 1
)
echo ✓ Frontend build completed successfully
echo.

echo [3/4] Build Summary:
echo ✓ Backend: Compiled successfully
echo ✓ Frontend: Compiled successfully
echo.

echo [4/4] Next Steps:
echo 1. Set up your environment variables (.env files)
echo 2. Set up your PostgreSQL database
echo 3. Run database setup: cd backend ^&^& npm run prisma:generate ^&^& npm run prisma:migrate:dev
echo 4. Start backend: cd backend ^&^& npm run dev
echo 5. Start frontend: cd frontend ^&^& npm run dev
echo.

echo ========================================
echo    Build completed successfully!
echo ========================================
pause