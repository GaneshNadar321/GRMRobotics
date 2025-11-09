@echo off
echo ========================================
echo    Creating Test Contact Messages
echo ========================================
echo.

echo Creating test contact messages for admin dashboard...

curl -X POST http://localhost:3001/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Rajesh Kumar\",\"email\":\"rajesh@example.com\",\"phone\":\"+91-9876543210\",\"subject\":\"Product Inquiry - Arduino Starter Kit\",\"message\":\"Hi, I'm interested in the Arduino Starter Kit for my 12-year-old son. Can you provide more details about the difficulty level and what's included in the kit?\"}"

curl -X POST http://localhost:3001/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Priya Sharma\",\"email\":\"priya.sharma@gmail.com\",\"phone\":\"+91-8765432109\",\"subject\":\"Bulk Order Inquiry\",\"message\":\"Hello, I'm a teacher at Delhi Public School. We're looking to purchase 20 robotics kits for our STEM lab. Can you provide bulk pricing and educational discounts?\"}"

curl -X POST http://localhost:3001/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Amit Patel\",\"email\":\"amit.patel@techcorp.com\",\"phone\":\"+91-7654321098\",\"subject\":\"Technical Support\",\"message\":\"I purchased the Advanced Robotics Kit last month but I'm having trouble with the servo motor programming. The manual doesn't cover the specific issue I'm facing. Can someone help?\"}"

curl -X POST http://localhost:3001/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Sneha Reddy\",\"email\":\"sneha.reddy@student.com\",\"subject\":\"Workshop Inquiry\",\"message\":\"Do you conduct robotics workshops for college students? I'm studying Computer Science and would love to learn more about embedded systems and IoT.\"}"

curl -X POST http://localhost:3001/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Dr. Vikram Singh\",\"email\":\"vikram.singh@university.edu\",\"phone\":\"+91-6543210987\",\"subject\":\"Research Collaboration\",\"message\":\"I'm a professor at IIT Delhi working on autonomous robotics. I'd like to discuss potential collaboration opportunities and bulk procurement for our research lab.\"}"

echo.
echo ✅ Test messages created successfully!
echo.
echo Now you can:
echo 1. Login to admin panel: http://localhost:3000/admin
echo 2. Go to Messages section
echo 3. See the unread message count in sidebar
echo 4. Test message management features
echo.
pause