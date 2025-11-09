@echo off
echo ========================================
echo    Creating Test Orders for Admin
echo ========================================
echo.

echo Creating test orders to demonstrate order details...

REM First, let's create a test user if not exists
curl -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Test\",\"lastName\":\"Customer\",\"email\":\"testcustomer@example.com\",\"password\":\"password123\",\"phone\":\"+91-9876543210\"}"

echo.
echo Test user created (or already exists)
echo.

REM Login to get token
echo Getting auth token...
for /f "tokens=*" %%i in ('curl -s -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"testcustomer@example.com\",\"password\":\"password123\"}" ^| findstr /r "\"token\"" ^| sed "s/.*\"token\":\"\([^\"]*\)\".*/\1/"') do set TOKEN=%%i

echo Token obtained
echo.

REM Create test orders with different statuses
echo Creating test order 1 (PAID status)...
curl -X POST http://localhost:3001/api/orders ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"items\":[{\"productId\":\"test-product-1\",\"quantity\":2,\"price\":1500}],\"shippingAddress\":{\"name\":\"Test Customer\",\"address\":\"123 Test Street\",\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"pincode\":\"400001\",\"country\":\"India\",\"phone\":\"+91-9876543210\"},\"paymentMethod\":\"razorpay\"}"

echo.
echo Creating test order 2 (PROCESSING status)...
curl -X POST http://localhost:3001/api/orders ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"items\":[{\"productId\":\"test-product-2\",\"quantity\":1,\"price\":2500}],\"shippingAddress\":{\"name\":\"Test Customer\",\"address\":\"456 Demo Avenue\",\"city\":\"Delhi\",\"state\":\"Delhi\",\"pincode\":\"110001\",\"country\":\"India\",\"phone\":\"+91-9876543210\"},\"paymentMethod\":\"razorpay\"}"

echo.
echo Creating test order 3 (SHIPPED status)...
curl -X POST http://localhost:3001/api/orders ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"items\":[{\"productId\":\"test-product-3\",\"quantity\":3,\"price\":800}],\"shippingAddress\":{\"name\":\"Test Customer\",\"address\":\"789 Sample Road\",\"city\":\"Bangalore\",\"state\":\"Karnataka\",\"pincode\":\"560001\",\"country\":\"India\",\"phone\":\"+91-9876543210\"},\"paymentMethod\":\"razorpay\"}"

echo.
echo ✅ Test orders created successfully!
echo.
echo Now you can:
echo 1. Login to admin panel: http://localhost:3000/admin
echo 2. Go to Orders section
echo 3. Click the eye icon to view order details
echo 4. Test order status updates
echo 5. See customer information, items, and payment details
echo.
echo Note: Orders will be created with PENDING status initially.
echo You can update their status from the order detail page.
echo.
pause