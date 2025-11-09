@echo off
echo ========================================
echo   DATABASE MIGRATION - NEW FEATURES
echo ========================================
echo.
echo This will add new tables for:
echo - Wishlist
echo - Contact Messages
echo - Newsletter Subscriptions
echo - Stock Notifications
echo - Product Q&A
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

cd backend

echo.
echo Generating Prisma Client...
npx prisma generate

echo.
echo Running database migration...
npx prisma migrate dev --name add_wishlist_contact_newsletter_features

echo.
echo ========================================
echo   MIGRATION COMPLETE!
echo ========================================
echo.
echo New features added:
echo [✓] Wishlist system
echo [✓] Contact form backend
echo [✓] Newsletter subscriptions
echo [✓] Stock notifications
echo [✓] Product Q&A system
echo.
echo Press any key to exit...
pause > nul
