@echo off
echo ========================================
echo GRM Robotics - Automated Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/7] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Download the LTS version and run the installer.
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

REM Check if npm is installed
echo [2/7] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)
echo ✓ npm is installed
echo.

REM Install backend dependencies
echo [3/7] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing packages... This may take 2-5 minutes...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)
echo ✓ Backend dependencies installed
cd ..
echo.

REM Install frontend dependencies
echo [4/7] Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo Installing packages... This may take 2-5 minutes...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)
echo ✓ Frontend dependencies installed
cd ..
echo.

REM Check for .env files
echo [5/7] Checking environment configuration...
if not exist "backend\.env" (
    echo WARNING: backend\.env file not found!
    echo Please copy backend\.env.example to backend\.env
    echo and configure your database password.
    echo.
    echo Press any key to open the folder...
    pause >nul
    explorer backend
    echo.
    echo After creating .env file, run this script again.
    pause
    exit /b 1
)
echo ✓ Backend .env file exists

if not exist "frontend\.env.local" (
    echo WARNING: frontend\.env.local file not found!
    echo Copying from .env.example...
    copy "frontend\.env.example" "frontend\.env.local" >nul
    echo ✓ Created frontend\.env.local
) else (
    echo ✓ Frontend .env.local file exists
)
echo.

REM Setup database
echo [6/7] Setting up database...
echo This will create the database schema and add sample data.
echo Make sure PostgreSQL is running!
echo.
set /p continue="Continue with database setup? (Y/N): "
if /i "%continue%" neq "Y" (
    echo Skipping database setup
    goto :skip_db
)

cd backend
echo Generating Prisma Client...
call npm run prisma:generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma Client
    echo Make sure PostgreSQL is installed and running
    pause
    exit /b 1
)

echo Running database migrations...
call npm run prisma:migrate:dev -- --name init
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations
    echo Check your DATABASE_URL in backend\.env
    pause
    exit /b 1
)

echo Adding sample data...
call npm run seed
if %errorlevel% neq 0 (
    echo WARNING: Failed to seed database
    echo You can try running 'npm run seed' manually later
)
cd ..
echo ✓ Database setup complete
echo.

:skip_db

REM Final instructions
echo [7/7] Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Open TWO Command Prompt windows
echo.
echo 2. In the FIRST window, run:
echo    cd backend
echo    npm run dev
echo.
echo 3. In the SECOND window, run:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open your browser and go to:
echo    http://localhost:3000
echo.
echo Test Accounts:
echo - Admin: admin@grmrobotics.com / Admin123!
echo - User: john@example.com / User123!
echo.
echo ========================================
echo.
echo Press any key to exit...
pause >nul
