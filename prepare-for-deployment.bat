@echo off
echo 🚀 Preparing GRM Robotics for FREE Deployment
echo =============================================
echo.

echo 📋 This script will prepare your project for deployment to:
echo    - Frontend: Vercel (FREE)
echo    - Backend: Railway (FREE) 
echo    - Database: Neon (FREE)
echo.

echo 🔧 Step 1: Creating production environment files...
echo.

REM Create frontend production environment
echo Creating frontend/.env.production...
cd frontend
echo # Production Environment for GRM Robotics Frontend > .env.production
echo # Update these URLs after deployment >> .env.production
echo NEXT_PUBLIC_API_URL="https://your-backend-url.railway.app/api" >> .env.production
echo NEXT_PUBLIC_APP_URL="https://your-frontend-url.vercel.app" >> .env.production
echo NEXT_PUBLIC_SITE_URL="https://your-frontend-url.vercel.app" >> .env.production

REM Create Vercel configuration
echo Creating vercel.json...
echo { > vercel.json
echo   "framework": "nextjs", >> vercel.json
echo   "buildCommand": "npm run build", >> vercel.json
echo   "devCommand": "npm run dev", >> vercel.json
echo   "installCommand": "npm install", >> vercel.json
echo   "outputDirectory": ".next" >> vercel.json
echo } >> vercel.json

cd ..

REM Create backend production environment
echo Creating backend/.env.production...
cd backend
echo # Production Environment for GRM Robotics Backend > .env.production
echo # Database - Get this from Neon.tech >> .env.production
echo DATABASE_URL="postgresql://username:password@host:5432/database" >> .env.production
echo. >> .env.production
echo # JWT Secrets - Generated secure keys >> .env.production
echo JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261" >> .env.production
echo REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e" >> .env.production
echo. >> .env.production
echo # Razorpay - Add your production keys >> .env.production
echo RAZORPAY_KEY_ID="your_production_razorpay_key" >> .env.production
echo RAZORPAY_KEY_SECRET="your_production_razorpay_secret" >> .env.production
echo. >> .env.production
echo # Email - Configure Gmail >> .env.production
echo EMAIL_FROM="noreply@grmrobotics.com" >> .env.production
echo EMAIL_HOST="smtp.gmail.com" >> .env.production
echo EMAIL_PORT="587" >> .env.production
echo EMAIL_USER="your-email@gmail.com" >> .env.production
echo EMAIL_PASS="your-gmail-app-password" >> .env.production
echo. >> .env.production
echo # URLs - Update after deployment >> .env.production
echo FRONTEND_URL="https://your-frontend-url.vercel.app" >> .env.production
echo BACKEND_URL="https://your-backend-url.railway.app" >> .env.production
echo. >> .env.production
echo # Production settings >> .env.production
echo NODE_ENV=production >> .env.production
echo PORT=3001 >> .env.production

REM Create Railway configuration
echo Creating railway.json...
echo { > railway.json
echo   "$schema": "https://railway.app/railway.schema.json", >> railway.json
echo   "build": { >> railway.json
echo     "builder": "NIXPACKS" >> railway.json
echo   }, >> railway.json
echo   "deploy": { >> railway.json
echo     "startCommand": "npm run start:prod", >> railway.json
echo     "restartPolicyType": "ON_FAILURE", >> railway.json
echo     "restartPolicyMaxRetries": 10 >> railway.json
echo   } >> railway.json
echo } >> railway.json

REM Update package.json for production
echo Updating package.json for production...
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['start:prod'] = 'npm run build && npm run start';
pkg.scripts['start'] = 'node dist/server.js';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('✅ Updated package.json scripts');
"

cd ..

echo.
echo ✅ Preparation complete!
echo.
echo 📋 Files created:
echo    - frontend/.env.production
echo    - frontend/vercel.json  
echo    - backend/.env.production
echo    - backend/railway.json
echo    - Updated backend/package.json
echo.
echo 🚀 Next steps:
echo    1. Read FREE_DEPLOYMENT_GUIDE.md for detailed instructions
echo    2. Sign up for free accounts at:
echo       - neon.tech (database)
echo       - railway.app (backend)
echo       - vercel.com (frontend)
echo    3. Follow the deployment guide step by step
echo.
echo 📖 Open FREE_DEPLOYMENT_GUIDE.md for complete instructions!
echo.
pause