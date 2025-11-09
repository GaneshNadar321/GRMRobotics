#!/bin/bash

echo "========================================"
echo "    GRM Robotics - Build Script"
echo "========================================"
echo

echo "[1/4] Building Backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend npm install failed"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Backend build failed"
    exit 1
fi
echo "✓ Backend build completed successfully"
echo

echo "[2/4] Building Frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend npm install failed"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend build failed"
    exit 1
fi
echo "✓ Frontend build completed successfully"
echo

echo "[3/4] Build Summary:"
echo "✓ Backend: Compiled successfully"
echo "✓ Frontend: Compiled successfully"
echo

echo "[4/4] Next Steps:"
echo "1. Set up your environment variables (.env files)"
echo "2. Set up your PostgreSQL database"
echo "3. Run database migrations: cd backend && npm run prisma:migrate:dev"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"
echo

echo "========================================"
echo "    Build completed successfully!"
echo "========================================"