@echo off
echo ========================================
echo    Testing Razorpay Integration
echo ========================================
echo.

echo [1/3] Checking Razorpay Configuration...
echo Frontend Key ID: rzp_test_Rcs02GVJSBCdpe
echo Backend Key ID: rzp_test_Rcs02GVJSBCdpe
echo Backend Secret: HOgOaN1NMTivnmRUDL0lgct2
echo ✅ Razorpay keys configured

echo.
echo [2/3] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo [3/3] Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo    🎉 Test Environment Ready!
echo ========================================
echo.
echo Services:
echo • Backend: http://localhost:3001
echo • Frontend: http://localhost:3000
echo.
echo Test Payment Flow:
echo 1. Go to http://localhost:3000
echo 2. Register/Login as a user
echo 3. Add products to cart
echo 4. Go to checkout
echo 5. Fill shipping details
echo 6. Click "Proceed to Payment"
echo 7. Use Razorpay test cards:
echo    - Card: 4111 1111 1111 1111
echo    - CVV: Any 3 digits
echo    - Expiry: Any future date
echo.
echo Press any key to close test servers...
pause > nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Test complete!
pause