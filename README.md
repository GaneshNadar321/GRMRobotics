# GRM Robotics - E-Commerce Platform

A full-stack production-ready e-commerce platform for selling LEGO-style robotics kits with integrated video tutorials and user manuals.

## 🚀 Features

- **User Storefront**: Browse products, cart, checkout with Razorpay, order tracking
- **Admin Dashboard**: Product/order/user management, analytics, content management
- **Authentication**: JWT-based auth with role-based access control (RBAC)
- **Payment Integration**: Razorpay checkout and webhook verification
- **Content Management**: Video tutorials and PDF manuals per product
- **Search & Filters**: Full-text search, category/price/age filters
- **Reviews & Ratings**: Verified buyer reviews with admin moderation
- **Responsive Design**: Mobile-first UI with Tailwind CSS

## 📦 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query for data fetching
- Zustand for state management

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Razorpay SDK

### DevOps
- Docker & Docker Compose
- PostgreSQL with pgAdmin
- Environment-based configuration

## 🛠️ Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose (optional)
- PostgreSQL (or use Docker)

## 🎯 Complete Beginner? Start Here!

**Never used Node.js, npm, or databases before?** No problem! Follow these guides:

### 📚 Step-by-Step Guides (In Order)

1. **[QUICK_START.md](QUICK_START.md)** ⭐ START HERE
   - Simple 5-step guide
   - No technical knowledge needed
   - Get running in 30 minutes

2. **[BEGINNER_SETUP_GUIDE.md](BEGINNER_SETUP_GUIDE.md)**
   - Detailed instructions with explanations
   - What each step does and why
   - Screenshots and examples

3. **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)**
   - Checkbox list to track progress
   - Verify everything is working
   - Success criteria

4. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**
   - Common problems and solutions
   - Error message explanations
   - How to fix issues

5. **[WHAT_TO_DO_NEXT.md](WHAT_TO_DO_NEXT.md)**
   - After setup is complete
   - Customization ideas
   - Learning resources

### 🚀 Super Quick Setup (Windows)

```bash
# 1. Install Node.js from https://nodejs.org/ (LTS version)
# 2. Install PostgreSQL from https://www.postgresql.org/
# 3. Restart your computer
# 4. Double-click setup.bat (installs everything)
# 5. Double-click start-dev.bat (starts the app)
# 6. Open http://localhost:3000 in your browser
```

### 📖 Additional Documentation

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Understand the folders and files
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production

---

## 👨‍💻 For Experienced Developers

**Already know Node.js, React, and PostgreSQL?** Skip to:

## 📋 Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

### Backend `.env`
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/grm_robotics?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# Email (mock in dev)
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.example.com"
EMAIL_PORT="587"
EMAIL_USER="user"
EMAIL_PASS="pass"

# File Storage
STORAGE_TYPE="local" # or "s3"
UPLOAD_DIR="./uploads"

# S3 Configuration (if STORAGE_TYPE=s3)
S3_BUCKET="grm-robotics-assets"
S3_REGION="us-east-1"
S3_ACCESS_KEY_ID="your_access_key"
S3_SECRET_ACCESS_KEY="your_secret_key"
S3_ENDPOINT="" # Optional for S3-compatible services

# Server
PORT="3001"
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# Security
BCRYPT_ROUNDS="10"
RATE_LIMIT_WINDOW_MS="900000"
RATE_LIMIT_MAX_REQUESTS="100"
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 🚀 Quick Start with Docker

1. **Clone and setup**
```bash
git clone <repository-url>
cd grm-robotics
```

2. **Copy environment files**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edit the .env files with your credentials
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Run migrations and seed data**
```bash
docker-compose exec backend npm run prisma:migrate
docker-compose exec backend npm run seed
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- pgAdmin: http://localhost:5050 (admin@admin.com / admin)

## 💻 Local Development (without Docker)

### Backend Setup

```bash
cd backend
npm install

# Setup database
npm run prisma:migrate
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 Database Schema

The database includes the following main tables:
- `users` - User accounts with role-based access
- `products` - Product catalog with inventory
- `categories` - Product categories
- `product_images` - Product image gallery
- `tutorials` - Video tutorials per product
- `manuals` - PDF user manuals
- `carts` & `cart_items` - Shopping cart
- `orders` & `order_items` - Order management
- `payments` - Payment tracking
- `reviews` - Product reviews and ratings
- `coupons` - Discount codes

## 🔐 Default Users (after seeding)

### Admin Users
- Email: `admin@grmrobotics.com` / Password: `Admin123!`
- Email: `manager@grmrobotics.com` / Password: `Manager123!`

### Regular Users
- Email: `john@example.com` / Password: `User123!`
- Email: `jane@example.com` / Password: `User123!`

## 📡 API Documentation

Import `postman_collection.json` into Postman for complete API documentation.

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

#### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item

#### Checkout & Orders
- `POST /api/checkout/create-order` - Create order and Razorpay order
- `POST /api/checkout/verify` - Verify payment
- `GET /api/orders` - List user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin)

#### Search
- `GET /api/search?q=robot&category=beginner` - Search products

## 🚢 Production Deployment

### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

### Heroku (Backend)
```bash
cd backend
heroku create grm-robotics-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku run npm run prisma:migrate
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Security Checklist

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with expiration
- ✅ Input validation and sanitization
- ✅ SQL injection protection (Prisma ORM)
- ✅ CORS configuration
- ✅ Rate limiting on API endpoints
- ✅ Helmet.js security headers
- ✅ Environment variables for secrets
- ✅ Razorpay webhook signature verification

## 📈 Performance Optimizations

- Server-side rendering for product pages
- Static generation for marketing pages
- Image optimization with Next/Image
- Lazy loading for images and videos
- Database indexing on frequently queried fields
- Response caching where appropriate

## 🎨 Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Alt text for all images
- Color contrast compliance (WCAG AA)
- Focus indicators

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please open a GitHub issue or contact support@grmrobotics.com
