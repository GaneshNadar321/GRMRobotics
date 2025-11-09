@echo off
echo ========================================
echo Seeding Database with Sample Data
echo ========================================
echo.

cd backend
call npm run seed

echo.
echo ========================================
echo Database seeded successfully!
echo.
echo You can now login with:
echo Admin: admin@grmrobotics.com / Admin123!
echo User: john@example.com / User123!
echo ========================================
echo.
pause
