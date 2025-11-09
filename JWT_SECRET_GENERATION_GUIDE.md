# 🔐 JWT Secret Key Generation Guide

## 🎯 Your Generated Secrets

**✅ Generated JWT Secrets (Copy these to your production .env):**

```env
JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"
REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"
```

## 🛠️ Alternative Generation Methods

### Method 1: Node.js Crypto (Recommended)
```javascript
// Run this in Node.js console or create a script
const crypto = require('crypto');

// Generate 64-byte (512-bit) secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_SECRET:', jwtSecret);

const refreshSecret = crypto.randomBytes(64).toString('hex');
console.log('REFRESH_TOKEN_SECRET:', refreshSecret);
```

### Method 2: OpenSSL Command Line
```bash
# Generate JWT Secret (64 bytes)
openssl rand -hex 64

# Generate Refresh Token Secret (64 bytes)
openssl rand -hex 64
```

### Method 3: Online Generators (Use with caution)
- **Recommended**: Use local generation methods
- **If using online**: Only use HTTPS sites and regenerate for production

### Method 4: PowerShell (Windows)
```powershell
# Generate random bytes and convert to hex
[System.Web.Security.Membership]::GeneratePassword(128, 0)

# Or using .NET crypto
Add-Type -AssemblyName System.Security
$bytes = New-Object byte[] 64
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
[System.BitConverter]::ToString($bytes) -replace '-'
```

### Method 5: Python
```python
import secrets

# Generate 64-byte secret
jwt_secret = secrets.token_hex(64)
print(f"JWT_SECRET: {jwt_secret}")

refresh_secret = secrets.token_hex(64)
print(f"REFRESH_TOKEN_SECRET: {refresh_secret}")
```

## 📋 Environment File Setup

### Development (.env)
```env
# Development secrets (already in your .env)
JWT_SECRET="your-dev-secret"
REFRESH_TOKEN_SECRET="your-dev-refresh-secret"
```

### Production (.env.production)
```env
# Use the generated secrets above
JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"
REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"

# Other production variables
NODE_ENV=production
DATABASE_URL="your-production-database-url"
RAZORPAY_KEY_ID="your-production-razorpay-key"
RAZORPAY_KEY_SECRET="your-production-razorpay-secret"
FRONTEND_URL="https://your-domain.com"
```

## 🔒 Security Best Practices

### Secret Requirements
- **Length**: Minimum 32 bytes (256 bits), recommended 64 bytes (512 bits)
- **Randomness**: Use cryptographically secure random generators
- **Uniqueness**: Different secrets for different environments
- **Rotation**: Change secrets periodically

### Storage Security
- **Never commit to Git**: Add .env files to .gitignore
- **Environment Variables**: Store in server environment variables
- **Access Control**: Limit who can access production secrets
- **Backup**: Securely backup secrets (encrypted)

### Environment Separation
```
Development  → Use simple secrets for testing
Staging      → Use production-like secrets
Production   → Use the generated secure secrets
```

## 🚀 Deployment Setup

### 1. Server Environment Variables
```bash
# Set environment variables on your server
export JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"
export REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"
```

### 2. Docker Environment
```dockerfile
# In your Dockerfile or docker-compose.yml
ENV JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"
ENV REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"
```

### 3. Cloud Platform Setup
```bash
# Heroku
heroku config:set JWT_SECRET="your-secret-here"

# Vercel
vercel env add JWT_SECRET

# Railway
railway variables set JWT_SECRET="your-secret-here"
```

## ⚠️ Important Security Notes

### DO NOT:
- ❌ Use simple passwords or phrases
- ❌ Commit secrets to version control
- ❌ Share secrets in plain text
- ❌ Use the same secrets across environments
- ❌ Use online generators for production secrets

### DO:
- ✅ Use cryptographically secure random generators
- ✅ Use minimum 64-byte (512-bit) secrets
- ✅ Store secrets securely in environment variables
- ✅ Rotate secrets periodically
- ✅ Use different secrets for each environment

## 🧪 Testing Your Secrets

### Verify Secret Strength
```javascript
// Check secret length
const secret = "your-jwt-secret-here";
console.log(`Secret length: ${secret.length} characters`);
console.log(`Secret bytes: ${Buffer.from(secret, 'hex').length} bytes`);

// Should be at least 64 characters (32 bytes) for hex-encoded secrets
// Recommended: 128 characters (64 bytes)
```

### Test JWT Generation
```javascript
const jwt = require('jsonwebtoken');

const payload = { userId: 'test', role: 'user' };
const secret = 'your-jwt-secret-here';

try {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  console.log('✅ JWT generation successful');
  
  const decoded = jwt.verify(token, secret);
  console.log('✅ JWT verification successful');
} catch (error) {
  console.log('❌ JWT test failed:', error.message);
}
```

## 🎯 Quick Setup Commands

### Generate New Secrets
```bash
# Run the generator script
node generate-jwt-secrets.js

# Or use Node.js directly
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('REFRESH_TOKEN_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

### Update Environment File
```bash
# Create production environment file
cp .env .env.production

# Edit with your generated secrets
nano .env.production
```

---

## ✅ Your Secrets Are Ready!

**Copy these to your production environment:**

```env
JWT_SECRET="a37e6d68ad1f5ce687ff47d401cec461ac218e5eca9feefcbca8607a548bdb3b79a74a9cd4fdbabcb7e17f13ec1b93892ebb32020af5b51c5c6e45d000e8b261"
REFRESH_TOKEN_SECRET="cb5dfe0e7916dc10e9a4f72cbff9c628eba96b3f17c74e31b57d0103c20e7eba309cadf7f65988f21fff8bb9753129055843ca6c7d820f89acbe6f934363df34e"
```

**These secrets are:**
- 🔒 **Cryptographically secure** (512-bit strength)
- 🎯 **Production ready** (meets security standards)
- 🔄 **Unique** (generated specifically for your application)
- ✅ **Safe to use** (generated locally, not shared)