@echo off
cls
echo ========================================
echo RESETTING DATABASE - FIXING LOGIN
echo ========================================
echo.
echo This will:
echo 1. Drop all tables
echo 2. Create fresh tables
echo 3. Add admin users
echo.
echo Press any key to continue...
pause > nul

cd backend

echo.
echo [1/3] Dropping all tables...
npx prisma migrate reset --force --skip-seed

echo.
echo [2/3] Creating fresh tables...
npx prisma migrate deploy

echo.
echo [3/3] Adding admin users...
npm run seed

echo.
echo ========================================
echo SUCCESS! Database reset complete!
echo ========================================
echo.
echo You can now login with:
echo.
echo Email: admin@grmrobotics.com
echo Password: Admin123!
echo.
echo OR
echo.
echo Email: john@example.com
echo Password: User123!
echo.
echo ========================================
echo.
echo Press any key to close...
pause > nul
