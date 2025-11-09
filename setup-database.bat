@echo off
echo ========================================
echo    Database Setup Script
echo ========================================
echo.

echo Checking if .env file exists...
if not exist "backend\.env" (
    echo ERROR: .env file not found in backend directory!
    echo Please create backend\.env file with your database configuration.
    echo See BUILD_GUIDE.md for the template.
    pause
    exit /b 1
)

echo [1/3] Generating Prisma Client...
cd backend
call npm run prisma:generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed
    echo Make sure your DATABASE_URL is correct in .env file
    pause
    exit /b 1
)

echo [2/3] Running Database Migrations...
call npm run prisma:migrate:dev
if %errorlevel% neq 0 (
    echo ERROR: Database migration failed
    echo Make sure PostgreSQL is running and DATABASE_URL is correct
    pause
    exit /b 1
)

echo [3/3] Seeding Database (Optional)...
set /p seed="Do you want to seed the database with sample data? (y/n): "
if /i "%seed%"=="y" (
    call npm run seed
    if %errorlevel% neq 0 (
        echo WARNING: Database seeding failed, but this is optional
    ) else (
        echo ✓ Database seeded successfully
    )
)

echo.
echo ========================================
echo    Database setup completed!
echo ========================================
echo.
echo You can now start the development servers:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm run dev
echo.
pause