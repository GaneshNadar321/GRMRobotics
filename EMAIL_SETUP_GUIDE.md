# 📧 Email Configuration Guide for GRM Robotics

## 🎯 Email Services Overview

Your GRM Robotics platform needs email for:
- ✅ Order confirmations
- ✅ User registration verification
- ✅ Password reset emails
- ✅ Shipping notifications
- ✅ Contact form submissions

## 🚀 Recommended Email Providers

### 1. **Gmail/Google Workspace** (Recommended for startups)
**Cost**: Free (Gmail) or $6/month (Google Workspace)
**Reliability**: Excellent
**Setup**: Easy

#### Setup Steps:
1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"

#### Configuration:
```env
EMAIL_FROM="noreply@grmrobotics.com"  # Your business email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"     # Your Gmail address
EMAIL_PASS="your-app-password"        # 16-character app password
```

### 2. **SendGrid** (Best for high volume)
**Cost**: Free (100 emails/day) to $19.95/month (40,000 emails)
**Reliability**: Excellent
**Features**: Analytics, templates, APIs

#### Setup Steps:
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify your domain
3. Create API key in Settings → API Keys

#### Configuration:
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"                   # Literally "apikey"
EMAIL_PASS="your-sendgrid-api-key"    # Your actual API key
```

### 3. **Mailgun** (Developer-friendly)
**Cost**: Free (5,000 emails/month) to $35/month (50,000 emails)
**Reliability**: Excellent
**Features**: APIs, webhooks, analytics

#### Setup Steps:
1. Sign up at [mailgun.com](https://mailgun.com)
2. Add and verify your domain
3. Get SMTP credentials from Domain Settings

#### Configuration:
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT="587"
EMAIL_USER="postmaster@mg.yourdomain.com"  # From Mailgun dashboard
EMAIL_PASS="your-mailgun-password"         # From Mailgun dashboard
```

### 4. **Amazon SES** (AWS Integration)
**Cost**: $0.10 per 1,000 emails
**Reliability**: Excellent
**Best for**: AWS-hosted applications

#### Setup Steps:
1. Enable SES in AWS Console
2. Verify your domain
3. Create SMTP credentials

#### Configuration:
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="email-smtp.us-east-1.amazonaws.com"  # Your region
EMAIL_PORT="587"
EMAIL_USER="your-ses-smtp-username"
EMAIL_PASS="your-ses-smtp-password"
```

### 5. **Zoho Mail** (Business email)
**Cost**: Free (5 users) to $1/user/month
**Reliability**: Good
**Features**: Business email with SMTP

#### Setup Steps:
1. Sign up at [zoho.com/mail](https://zoho.com/mail)
2. Add your domain
3. Enable SMTP in settings

#### Configuration:
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.zoho.com"
EMAIL_PORT="587"
EMAIL_USER="noreply@grmrobotics.com"  # Your Zoho email
EMAIL_PASS="your-zoho-password"       # Your Zoho password
```

## 🎯 Quick Setup for Testing (Gmail)

### Step-by-Step Gmail Setup:

1. **Create/Use Gmail Account**:
   - Use your existing Gmail or create: `grmrobotics.business@gmail.com`

2. **Enable 2-Factor Authentication**:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification → Turn On

3. **Generate App Password**:
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Enter "GRM Robotics Platform"
   - Copy the 16-character password

4. **Update Your .env File**:
```env
EMAIL_FROM="grmrobotics.business@gmail.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="grmrobotics.business@gmail.com"
EMAIL_PASS="abcd efgh ijkl mnop"  # Your 16-character app password
```

## 🏢 Professional Setup (Custom Domain)

### For Professional Emails (@grmrobotics.com):

1. **Get a Domain**: Register `grmrobotics.com` (if not already owned)
2. **Choose Email Provider**: Google Workspace, Zoho, or Microsoft 365
3. **Set Up MX Records**: Point your domain to the email provider
4. **Create Email Accounts**: `noreply@grmrobotics.com`, `support@grmrobotics.com`

### Google Workspace Setup:
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="noreply@grmrobotics.com"
EMAIL_PASS="your-app-password"
```

## 🧪 Testing Your Email Configuration

### Test Script:
```javascript
// Create test-email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'your-test-email@gmail.com',  // Your email for testing
      subject: 'GRM Robotics - Email Test',
      html: `
        <h2>🤖 Email Configuration Test</h2>
        <p>If you receive this email, your GRM Robotics email configuration is working correctly!</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.log('❌ Email failed:', error.message);
  }
}

testEmail();
```

### Run Test:
```bash
cd backend
node test-email.js
```

## 📋 Environment Configuration Examples

### Development (.env):
```env
# Email Configuration - Gmail
EMAIL_FROM="grmrobotics.business@gmail.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="grmrobotics.business@gmail.com"
EMAIL_PASS="your-gmail-app-password"
```

### Production (.env.production):
```env
# Email Configuration - SendGrid (Production)
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASS="SG.your-sendgrid-api-key"
```

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid login"**:
   - Enable 2FA and use app password (Gmail)
   - Check username/password spelling
   - Verify SMTP settings

2. **"Connection timeout"**:
   - Check port number (587 for TLS, 465 for SSL)
   - Verify host address
   - Check firewall settings

3. **"Authentication failed"**:
   - Use app password, not regular password
   - Enable "Less secure app access" (not recommended)
   - Check API key format

### Debug Mode:
```javascript
// Add to your email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  debug: true,  // Enable debug
  logger: true, // Enable logging
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## 💰 Cost Comparison

| Provider | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| Gmail | Personal use | $6/month (Workspace) | Small business |
| SendGrid | 100/day | $19.95/month (40K) | High volume |
| Mailgun | 5,000/month | $35/month (50K) | Developers |
| Amazon SES | 62,000/month (AWS) | $0.10/1000 | AWS users |
| Zoho | 5 users | $1/user/month | Business email |

## 🎯 Recommended Setup for GRM Robotics

### For Immediate Launch (Gmail):
```env
EMAIL_FROM="grmrobotics.business@gmail.com"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="grmrobotics.business@gmail.com"
EMAIL_PASS="your-app-password"
```

### For Professional Launch (SendGrid):
```env
EMAIL_FROM="noreply@grmrobotics.com"
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASS="your-sendgrid-api-key"
```

## 🚀 Quick Start Commands

### 1. Set up Gmail (Fastest):
```bash
# 1. Enable 2FA on Gmail
# 2. Generate app password
# 3. Update .env file
# 4. Test with: node test-email.js
```

### 2. Set up SendGrid (Professional):
```bash
# 1. Sign up at sendgrid.com
# 2. Verify domain
# 3. Create API key
# 4. Update .env file
```

---

## ✅ Ready to Configure!

Choose your preferred method:
- **🚀 Quick Start**: Use Gmail with app password
- **🏢 Professional**: Use SendGrid or Google Workspace
- **💰 Budget**: Use free tiers of SendGrid/Mailgun

Your GRM Robotics platform will then be able to send:
- Order confirmations
- Welcome emails
- Password resets
- Shipping notifications