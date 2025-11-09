#!/bin/bash

# Railway deployment script for GRM Robotics Backend
echo "🚂 Starting Railway deployment..."

# Set environment variables for OpenSSL
export OPENSSL_CONF=/dev/null

# Build the application
echo "📦 Building application..."
npm run build

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy --accept-data-loss || {
    echo "⚠️ Migration failed, but continuing..."
}

# Start the application
echo "🚀 Starting application..."
npm run start