@echo off
echo ========================================
echo    Testing Product Manual Downloads
echo ========================================
echo.

echo [1/3] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo [2/3] Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo [3/3] Opening Product Page...
timeout /t 10 /nobreak > nul
start http://localhost:3000/products

echo.
echo ========================================
echo    📁 Product Manual Download Test
echo ========================================
echo.
echo Test Instructions:
echo.
echo 1. Setup Test Data:
echo    - Go to Admin > Products
echo    - Create or edit a product
echo    - Go to Admin > Manuals
echo    - Upload a manual and link it to the product
echo.
echo 2. Test Product Page Download:
echo    - Go to the product page
echo    - Click on "Attachments" tab
echo    - Click "Download" button on any manual
echo    - Verify PDF downloads correctly
echo.
echo 3. Test Cart Access:
echo    - Add product to cart
echo    - Go to cart page
echo    - Check if manuals are accessible (if applicable)
echo.
echo 4. Test Orders Access:
echo    - Complete a purchase
echo    - Go to My Orders
echo    - Check if manuals are downloadable for purchased products
echo.
echo Expected Behavior:
echo ✅ Manual downloads work on product pages
echo ✅ Proper filename (manual title.pdf)
echo ✅ No errors in browser console
echo ✅ Toast notification shows success
echo.
echo Troubleshooting:
echo • Check if manual is linked to product
echo • Verify backend uploads folder has files
echo • Check browser download settings
echo • Look for network errors in dev tools
echo.
echo Press any key to stop servers...
pause > nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Test complete!
pause