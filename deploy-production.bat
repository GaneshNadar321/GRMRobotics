@echo off
echo ========================================
echo    GRM Robotics - Production Deployment
echo ========================================
echo.

echo [1/8] Checking environment files...
if not exist "frontend\.env.production" (
    echo ❌ Missing frontend/.env.production
    echo Please copy frontend/.env.production.example to frontend/.env.production and configure it
    pause
    exit /b 1
)

if not exist "backend\.env" (
    echo ❌ Missing backend/.env
    echo Please copy backend/.env.production.example to backend/.env and configure it
    pause
    exit /b 1
)

echo ✅ Environment files found

echo.
echo [2/8] Installing dependencies...
cd frontend
call npm ci --production=false
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)

cd ..\backend
call npm ci --production=false
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)

echo ✅ Dependencies installed

echo.
echo [3/8] Running tests...
cd ..\frontend
call npm run test:ci
if %errorlevel% neq 0 (
    echo ⚠️ Frontend tests failed - continuing anyway
)

cd ..\backend
call npm run test
if %errorlevel% neq 0 (
    echo ⚠️ Backend tests failed - continuing anyway
)

echo.
echo [4/8] Building frontend...
cd ..\frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

echo ✅ Frontend built successfully

echo.
echo [5/8] Building backend...
cd ..\backend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Backend build failed
    pause
    exit /b 1
)

echo ✅ Backend built successfully

echo.
echo [6/8] Running database migrations...
call npm run prisma:generate
call npm run prisma:migrate
if %errorlevel% neq 0 (
    echo ❌ Database migration failed
    pause
    exit /b 1
)

echo ✅ Database migrations completed

echo.
echo [7/8] Creating production Docker images...
cd ..
docker-compose -f docker-compose.prod.yml build
if %errorlevel% neq 0 (
    echo ❌ Docker build failed
    pause
    exit /b 1
)

echo ✅ Docker images created

echo.
echo [8/8] Starting production services...
docker-compose -f docker-compose.prod.yml up -d
if %errorlevel% neq 0 (
    echo ❌ Failed to start services
    pause
    exit /b 1
)

echo.
echo ========================================
echo    🎉 Production Deployment Complete!
echo ========================================
echo.
echo Services running:
echo • Frontend: http://localhost:3000
echo • Backend API: http://localhost:3001
echo • Database: PostgreSQL on port 5432
echo.
echo To check status: docker-compose -f docker-compose.prod.yml ps
echo To view logs: docker-compose -f docker-compose.prod.yml logs -f
echo To stop: docker-compose -f docker-compose.prod.yml down
echo.
pause