# Deployment Guide - GRM Robotics

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 15+ installed (or use Docker)
- Razorpay test account

### Step 1: Clone and Install

```bash
# Clone repository
git clone <repository-url>
cd grm-robotics

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Environment Configuration

Create `.env` files in both backend and frontend directories using the `.env.example` templates.

**Backend `.env`:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/grm_robotics?schema=public"
JWT_SECRET="your-secret-key"
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="your_secret"
PORT="3001"
FRONTEND_URL="http://localhost:3000"
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxx"
```

### Step 3: Database Setup

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate:dev

# Seed database with sample data
npm run seed
```

### Step 4: Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/health

## Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec backend npm run prisma:migrate

# Seed database
docker-compose exec backend npm run seed

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Production Deployment

### Option 1: Vercel (Frontend) + Heroku (Backend)

#### Deploy Backend to Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create grm-robotics-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET="your-production-secret"
heroku config:set RAZORPAY_KEY_ID="rzp_live_xxxxx"
heroku config:set RAZORPAY_KEY_SECRET="your_live_secret"
heroku config:set FRONTEND_URL="https://your-frontend.vercel.app"

# Deploy
git push heroku main

# Run migrations
heroku run npm run prisma:migrate

# Seed database (optional)
heroku run npm run seed
```

#### Deploy Frontend to Vercel

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://grm-robotics-api.herokuapp.com/api
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

### Option 2: AWS EC2 with Docker

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.medium or larger
   - Open ports: 80, 443, 22

2. **Install Docker**
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

3. **Clone and Configure**
```bash
git clone <repository-url>
cd grm-robotics

# Create production .env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit with production values
nano backend/.env
nano frontend/.env.local
```

4. **Deploy with Docker Compose**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

5. **Setup Nginx Reverse Proxy**
```bash
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/grm-robotics

# Add configuration:
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

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/grm-robotics /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

### Option 3: DigitalOcean App Platform

1. Create new app from GitHub repository
2. Configure build settings:
   - Backend: `cd backend && npm install && npm run build`
   - Frontend: `cd frontend && npm install && npm run build`
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

## Environment Variables Reference

### Backend Required Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens
- `RAZORPAY_KEY_ID` - Razorpay API key
- `RAZORPAY_KEY_SECRET` - Razorpay secret
- `RAZORPAY_WEBHOOK_SECRET` - Webhook verification secret
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend Required Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Razorpay public key

### Optional Variables
- `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` - For S3 file storage
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - For email service

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Sample data seeded (if needed)
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Razorpay webhook configured
- [ ] CORS settings verified
- [ ] Admin account created
- [ ] Backup strategy implemented
- [ ] Monitoring setup (e.g., Sentry, LogRocket)
- [ ] CDN configured for static assets

## Razorpay Webhook Configuration

1. Login to Razorpay Dashboard
2. Go to Settings > Webhooks
3. Add webhook URL: `https://your-api-domain.com/api/webhooks/razorpay`
4. Select events: `payment.authorized`, `payment.captured`, `payment.failed`, `order.paid`
5. Copy webhook secret to `RAZORPAY_WEBHOOK_SECRET` env variable

## Monitoring and Maintenance

### Health Checks
- Backend: `GET /health`
- Database: Check Prisma connection
- Frontend: Check page load times

### Logs
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Heroku logs
heroku logs --tail -a grm-robotics-api
```

### Database Backups
```bash
# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Check firewall rules

2. **CORS errors**
   - Verify FRONTEND_URL in backend .env
   - Check CORS configuration in server.ts

3. **Razorpay payment fails**
   - Verify API keys are correct
   - Check webhook signature verification
   - Review Razorpay dashboard logs

4. **Build failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

## Performance Optimization

1. **Database**
   - Add indexes on frequently queried fields
   - Use connection pooling
   - Enable query caching

2. **Frontend**
   - Enable Next.js image optimization
   - Use CDN for static assets
   - Implement lazy loading

3. **Backend**
   - Enable response compression
   - Implement Redis caching
   - Use PM2 for process management

## Security Best Practices

- Keep dependencies updated
- Use strong JWT secrets
- Enable rate limiting
- Implement CSRF protection
- Regular security audits
- Monitor for suspicious activity
- Use environment-specific secrets
- Enable HTTPS only
- Sanitize user inputs
- Regular database backups
