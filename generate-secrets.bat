@echo off
echo 🔐 Generating JWT Secrets for GRM Robotics...
echo.

echo Running Node.js secret generator...
node generate-jwt-secrets.js

echo.
echo ✅ Secrets generated successfully!
echo.
echo 📋 Next steps:
echo 1. Copy the secrets from above
echo 2. Create a .env.production file
echo 3. Paste the secrets into your production environment
echo 4. Keep these secrets secure and private!
echo.
pause