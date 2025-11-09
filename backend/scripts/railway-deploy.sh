#!/bin/bash

# Railway deployment script for GRM Robotics Backend
echo "🚂 Starting Railway deployment..."

# Set environment variables for OpenSSL and SSL libraries
export OPENSSL_CONF=/dev/null
export LD_LIBRARY_PATH="/nix/store/*-openssl-1.1*/lib:$LD_LIBRARY_PATH"

# Check if SSL libraries are available
echo "🔍 Checking SSL libraries..."
find /nix/store -name "libssl.so*" 2>/dev/null | head -5 || echo "SSL libraries not found in expected location"

# Build the application
echo "📦 Building application..."
npm run build

# Generate Prisma client with correct binary target
echo "🔧 Generating Prisma client..."
PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-1.1.x npx prisma generate --generator client

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy || {
    echo "⚠️ Migration failed, but continuing..."
}

# Start the application
echo "🚀 Starting application..."
npm run start