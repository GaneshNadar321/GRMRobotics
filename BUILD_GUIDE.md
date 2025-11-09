# GRM Robotics - Build & Deployment Guide

## Prerequisites

Before building the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

## Project Structure

```
GRM Website/
├── backend/          # Express.js API server
├── frontend/         # Next.js React application
├── BUILD_GUIDE.md    # This file
└── README.md
```

## Environment Setup

### 1. Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/grm_robotics"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret-here"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Email Configuration (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"

# Server Configuration
PORT=5000
NODE_ENV="development"
```

### 2. Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

# OAuth (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
NEXT_PUBLIC_FACEBOOK_APP_ID="your-facebook-app-id"

# Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
```

## Build Instructions

### Backend Build

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate:dev
   
   # (Optional) Seed the database with sample data
   npm run seed
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Build

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Start the application:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Development Workflow

### Running Both Services Simultaneously

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on: http://localhost:5000

2. **In a new terminal, start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on: http://localhost:3000

### Available Scripts

#### Backend Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate:dev` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests
- `npm run lint` - Run ESLint

#### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Production Deployment

### Backend Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

If you prefer Docker, you can create Dockerfiles for each service:

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues:**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Verify database credentials

2. **Port Already in Use:**
   - Change PORT in backend .env file
   - Kill existing processes: `lsof -ti:5000 | xargs kill -9`

3. **Build Errors:**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `npm run build -- --clean`

4. **Environment Variables Not Loading:**
   - Ensure .env files are in correct directories
   - Restart development servers after changing .env files

### Performance Optimization

1. **Backend:**
   - Enable gzip compression
   - Use PM2 for process management in production
   - Implement Redis for caching

2. **Frontend:**
   - Enable Next.js image optimization
   - Use CDN for static assets
   - Implement proper caching headers

## Monitoring & Logging

- Backend logs are handled by Winston
- Frontend errors can be monitored with services like Sentry
- Database queries can be monitored through Prisma logging

## Security Checklist

- [ ] Change default JWT secrets
- [ ] Use HTTPS in production
- [ ] Set up proper CORS configuration
- [ ] Enable rate limiting
- [ ] Validate all environment variables
- [ ] Use secure session configuration

## Support

If you encounter any issues during the build process:

1. Check the console logs for specific error messages
2. Ensure all environment variables are properly set
3. Verify database connectivity
4. Check that all dependencies are installed correctly

For additional help, refer to the individual README files in the backend and frontend directories.