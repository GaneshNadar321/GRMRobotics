# 🚀 GRM Robotics - Production Deployment Guide

## ✅ Build Status
- **Backend**: ✅ Built successfully (`backend/dist/`)
- **Frontend**: ✅ Built successfully (`frontend/.next/`)

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Create production environment files:

**Backend (.env.production):**
```env
# Database
DATABASE_URL="your-production-database-url"

# JWT Secrets (Generate strong secrets!)
JWT_SECRET="your-super-secure-jwt-secret-here"
REFRESH_TOKEN_SECRET="your-super-secure-refresh-secret-here"

# Razorpay (Production Keys)
RAZORPAY_KEY_ID="your-production-razorpay-key"
RAZORPAY_KEY_SECRET="your-production-razorpay-secret"

# Email (Production SMTP)
SMTP_HOST="your-smtp-host"
SMTP_PORT=587
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
FROM_EMAIL="noreply@grmrobotics.com"

# App URLs
FRONTEND_URL="https://your-domain.com"
BACKEND_URL="https://api.your-domain.com"

# Node Environment
NODE_ENV=production
PORT=3001
```

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_URL="https://api.your-domain.com/api"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### 2. Database Setup
```bash
# Run database migrations
cd backend
npx prisma migrate deploy

# Seed initial data (categories, admin user)
npx prisma db seed
```

## 🌐 Deployment Options

### Option 1: VPS/Dedicated Server (Recommended)

#### Backend Deployment:
```bash
# 1. Upload backend/dist/ to your server
# 2. Install dependencies
npm ci --production

# 3. Install PM2 for process management
npm install -g pm2

# 4. Create PM2 ecosystem file
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'grm-robotics-api',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
```

```bash
# 5. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Frontend Deployment:
```bash
# 1. Upload frontend/.next/ and other necessary files
# 2. Install dependencies
npm ci --production

# 3. Start with PM2
pm2 start npm --name "grm-robotics-web" -- start
```

### Option 2: Docker Deployment

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
COPY prisma/ ./prisma/
EXPOSE 3001
CMD ["node", "dist/server.js"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY .next/ ./.next/
COPY public/ ./public/
COPY next.config.js ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: Cloud Platforms

#### Vercel (Frontend):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

#### Railway/Render (Backend):
- Connect your GitHub repository
- Set environment variables
- Deploy automatically

## 🔧 Server Configuration

### Nginx Configuration:
```nginx
# Frontend (Port 80/443)
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API (api.your-domain.com)
server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL Certificate (Let's Encrypt):
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificates
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

## 📊 Monitoring & Maintenance

### 1. Health Checks
- Backend: `https://api.your-domain.com/health`
- Frontend: Monitor with uptime services

### 2. Logs
```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 3. Database Backups
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated daily backups (crontab)
0 2 * * * /path/to/backup-script.sh
```

## 🔐 Security Checklist

- [ ] Strong JWT secrets generated
- [ ] Database credentials secured
- [ ] HTTPS enabled with valid SSL certificates
- [ ] Firewall configured (only ports 80, 443, 22 open)
- [ ] Regular security updates
- [ ] Database access restricted
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled

## 🚀 Go Live Steps

1. **Domain Setup:**
   - Point your domain to server IP
   - Configure DNS records (A records)

2. **SSL Certificate:**
   - Install Let's Encrypt certificates
   - Configure auto-renewal

3. **Final Testing:**
   - Test all functionality
   - Verify payment processing
   - Check email notifications
   - Test admin panel

4. **Launch:**
   - Update environment variables
   - Start services with PM2
   - Monitor logs for any issues

## 📞 Support

If you need help with deployment:
- Check logs for specific error messages
- Verify all environment variables are set
- Ensure database is accessible
- Test API endpoints individually

## 🎉 Congratulations!

Your GRM Robotics e-commerce platform is now ready for production! 

**Key Features Deployed:**
- ✅ Complete e-commerce functionality
- ✅ Admin dashboard
- ✅ Payment processing (Razorpay)
- ✅ Email notifications
- ✅ Product management
- ✅ Order management
- ✅ User authentication
- ✅ Video tutorials
- ✅ Responsive design
- ✅ SEO optimized