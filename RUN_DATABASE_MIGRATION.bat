@echo off
echo ========================================
echo   DATABASE MIGRATION
echo ========================================
echo.
echo This will create new tables:
echo - Wishlist
echo - ContactMessage
echo - Newsletter
echo - StockNotification
echo - ProductQuestion
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

cd backend

echo.
echo Step 1: Generating Prisma Client...
call npx prisma generate

echo.
echo Step 2: Creating migration...
call npx prisma migrate dev --name add_contact_wishlist_newsletter

echo.
echo Step 3: Applying migration...
call npx prisma migrate deploy

echo.
echo ========================================
echo   MIGRATION COMPLETE!
echo ========================================
echo.
echo New tables created:
echo [✓] wishlist
echo [✓] contact_messages
echo [✓] newsletter_subscribers
echo [✓] stock_notifications
echo [✓] product_questions
echo.
echo You can now:
echo - Use contact form
echo - Use wishlist
echo - Subscribe to newsletter
echo.
echo Press any key to exit...
pause > nul
