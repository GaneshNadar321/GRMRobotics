# 🗄️ Neon.tech Database Setup - Step by Step

## 🎯 What is Neon?
Neon is a serverless PostgreSQL database service that offers a generous free tier perfect for your GRM Robotics platform.

**Free Tier Includes:**
- 512 MB storage
- 1 database
- Unlimited queries
- Automatic backups
- SSL connections

## 📋 Step-by-Step Setup

### Step 1: Create Neon Account
1. **Go to Neon Website**
   - Open your browser
   - Navigate to: [https://neon.tech](https://neon.tech)

2. **Sign Up**
   - Click the **"Sign Up"** button (top right)
   - Choose **"Continue with GitHub"** (recommended)
   - Or use **"Continue with Google"**
   - Or create account with email

3. **Authorize GitHub** (if using GitHub)
   - Click **"Authorize Neon"** when prompted
   - This allows Neon to access your GitHub account for easy login

### Step 2: Create Your Database Project
1. **Welcome Screen**
   - After login, you'll see "Create your first project"
   - Click **"Create Project"** button

2. **Project Configuration**
   - **Project Name**: Enter `grm-robotics`
   - **Database Name**: Keep default `neondb` or change to `grmrobotics`
   - **Region**: Choose closest to your location:
     - **US East (N. Virginia)** - for US users
     - **Europe (Frankfurt)** - for European users
     - **Asia Pacific (Singapore)** - for Asian users
   - **PostgreSQL Version**: Keep default (latest version)

3. **Create Project**
   - Click **"Create Project"** button
   - Wait 10-30 seconds for database creation

### Step 3: Get Connection Details
1. **Dashboard Overview**
   - You'll be redirected to your project dashboard
   - You'll see database statistics and connection info

2. **Get Connection String**
   - Look for **"Connection Details"** section
   - Click **"Connection string"** tab
   - You'll see something like:
   ```
   postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

3. **Copy Connection String**
   - Click the **"Copy"** button next to the connection string
   - **IMPORTANT**: Save this in a secure location
   - This is your `DATABASE_URL` for production

### Step 4: Configure Database Access
1. **Database Settings**
   - Click **"Settings"** in the left sidebar
   - Go to **"General"** tab

2. **Connection Pooling** (Optional but recommended)
   - Click **"Connection pooling"** in left sidebar
   - Toggle **"Enable connection pooling"**
   - This improves performance for your application

3. **Compute Settings**
   - Click **"Compute"** in left sidebar
   - **Auto-suspend**: Keep enabled (saves resources)
   - **Compute size**: Keep on smallest (sufficient for free tier)

### Step 5: Test Database Connection
1. **SQL Editor**
   - Click **"SQL Editor"** in left sidebar
   - This opens a web-based database console

2. **Test Query**
   - In the SQL editor, type:
   ```sql
   SELECT version();
   ```
   - Click **"Run"** button
   - You should see PostgreSQL version information

3. **Create Test Table** (Optional)
   ```sql
   CREATE TABLE test_connection (
     id SERIAL PRIMARY KEY,
     message TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   INSERT INTO test_connection (message) VALUES ('GRM Robotics Database Ready!');
   
   SELECT * FROM test_connection;
   ```

### Step 6: Security Configuration
1. **IP Allowlist** (Optional)
   - Click **"Settings"** → **"IP Allow"**
   - By default, all IPs are allowed (good for development)
   - For production, you can restrict to specific IPs

2. **Database Users**
   - Click **"Settings"** → **"Roles"**
   - You'll see your default user
   - The connection string already includes credentials

### Step 7: Backup and Monitoring
1. **Backups**
   - Click **"Backups"** in left sidebar
   - Neon automatically creates backups
   - Free tier includes 7 days of backup retention

2. **Monitoring**
   - Click **"Monitoring"** in left sidebar
   - View database performance metrics
   - Monitor connection count and query performance

## 📝 Important Information to Save

After setup, save these details securely:

### Connection Information:
```
Database URL: postgresql://username:password@host:5432/database?sslmode=require
Host: ep-cool-darkness-123456.us-east-2.aws.neon.tech
Database: neondb
Username: [your-username]
Password: [your-password]
Port: 5432
SSL Mode: require
```

### For Your Environment Variables:
```env
# Add this to your backend/.env.production
DATABASE_URL="postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

## 🧪 Testing Your Database

### Test Connection from Your Computer:
1. **Install PostgreSQL Client** (optional)
   ```bash
   # Windows (using chocolatey)
   choco install postgresql

   # Or download from: https://www.postgresql.org/download/
   ```

2. **Test Connection**
   ```bash
   psql "postgresql://username:password@host:5432/database?sslmode=require"
   ```

### Test from Your Application:
1. **Update your backend/.env file**
   ```env
   DATABASE_URL="your-neon-connection-string"
   ```

2. **Run Prisma Commands**
   ```bash
   cd backend
   npx prisma db push
   npx prisma studio
   ```

## 🔧 Troubleshooting

### Common Issues:

1. **"Connection Timeout"**
   - Check your internet connection
   - Verify the connection string is correct
   - Ensure SSL mode is set to "require"

2. **"Authentication Failed"**
   - Double-check username and password in connection string
   - Ensure you copied the complete connection string

3. **"Database Not Found"**
   - Verify database name in connection string
   - Check if database was created successfully

4. **"SSL Connection Required"**
   - Ensure connection string includes `?sslmode=require`
   - Neon requires SSL connections

### Getting Help:
- **Neon Documentation**: [neon.tech/docs](https://neon.tech/docs)
- **Neon Discord**: [discord.gg/92vNTzKDGp](https://discord.gg/92vNTzKDGp)
- **Support**: [neon.tech/docs/introduction/support](https://neon.tech/docs/introduction/support)

## 📊 Free Tier Limits

**What's Included FREE:**
- ✅ 512 MB storage
- ✅ 1 database
- ✅ Unlimited queries
- ✅ 7-day backup retention
- ✅ SSL connections
- ✅ Connection pooling
- ✅ Monitoring dashboard

**Upgrade When You Need:**
- More storage (beyond 512 MB)
- Multiple databases
- Longer backup retention
- Dedicated compute resources

## 🎉 Success Checklist

Your Neon database is ready when:
- [ ] Account created successfully
- [ ] Project "grm-robotics" created
- [ ] Connection string copied and saved
- [ ] Test query executed successfully
- [ ] Connection string added to environment variables
- [ ] Database accessible from your application

## 🔄 Next Steps

After Neon setup:
1. **Copy your DATABASE_URL**
2. **Add it to Railway environment variables**
3. **Run database migrations in Railway**
4. **Test your application connection**

Your PostgreSQL database is now ready to power your GRM Robotics platform! 🚀