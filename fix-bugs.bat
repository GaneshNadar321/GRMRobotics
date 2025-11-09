@echo off
echo ========================================
echo    GRM Robotics - Bug Fix Script
echo ========================================
echo.

echo [1/6] Checking Environment Files...
if not exist "backend\.env" (
    if exist "backend\.env.example" (
        echo Creating backend .env from example...
        copy "backend\.env.example" "backend\.env"
        echo WARNING: Please update backend\.env with your actual configuration
    ) else (
        echo ERROR: No .env.example found in backend directory
    )
) else (
    echo ✓ Backend .env file exists
)

if not exist "frontend\.env.local" (
    if exist "frontend\.env.local.example" (
        echo Creating frontend .env.local from example...
        copy "frontend\.env.local.example" "frontend\.env.local"
        echo WARNING: Please update frontend\.env.local with your actual configuration
    ) else (
        echo ERROR: No .env.local.example found in frontend directory
    )
) else (
    echo ✓ Frontend .env.local file exists
)

echo.
echo [2/6] Installing Dependencies...
cd backend
echo Installing backend dependencies...
call npm install --silent
if %errorlevel% neq 0 (
    echo ERROR: Backend npm install failed
    pause
    exit /b 1
)

cd ..\frontend
echo Installing frontend dependencies...
call npm install --silent
if %errorlevel% neq 0 (
    echo ERROR: Frontend npm install failed
    pause
    exit /b 1
)

echo.
echo [3/6] Running Security Audit...
cd ..\backend
call npm audit fix --silent
cd ..\frontend
call npm audit fix --silent

echo.
echo [4/6] Building Projects...
cd ..\backend
echo Building backend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)

cd ..\frontend
echo Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed
    pause
    exit /b 1
)

echo.
echo [5/6] Checking Database Connection...
cd ..\backend
echo Checking if DATABASE_URL is configured...
findstr /C:"DATABASE_URL" .env >nul
if %errorlevel% neq 0 (
    echo WARNING: DATABASE_URL not found in .env file
    echo Please configure your database connection
) else (
    echo ✓ DATABASE_URL configured
)

echo.
echo [6/6] Bug Fixes Applied:
echo ✓ Fixed API URL mismatch (port 5000)
echo ✓ Added SSR safety checks
echo ✓ Enhanced error boundaries
echo ✓ Added cart persistence
echo ✓ Fixed metadata warnings
echo ✓ Created environment templates
echo ✓ Added loading components
echo ✓ Fixed authentication token handling

echo.
echo ========================================
echo    Bug fixes completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Configure your .env files with actual values
echo 2. Set up PostgreSQL database
echo 3. Run: setup-database.bat
echo 4. Start development: start-dev.bat
echo.
pause