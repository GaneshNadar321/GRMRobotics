# OAuth Setup Guide for GRM Robotics

This guide will help you set up Google and Facebook OAuth login for the GRM Robotics platform.

## 🚀 Quick Start

The OAuth system is **already implemented** and ready to use! You just need to configure the OAuth providers:

1. **Backend**: OAuth endpoints are ready (`/auth/google`, `/auth/facebook`)
2. **Frontend**: OAuth buttons are implemented and visible
3. **Database**: Schema supports OAuth users with provider linking
4. **Setup Needed**: Configure Google Cloud Console and Facebook Developers

## 🔧 Prerequisites

- Google Cloud Console account
- Facebook Developer account
- Running GRM Robotics application

## 📋 Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API and Google OAuth2 API

### Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in the required information:
   - App name: `GRM Robotics`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users if needed

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - Name: `GRM Robotics Web Client`
   - Authorized JavaScript origins: 
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
5. Copy the **Client ID**

### Step 4: Update Environment Variables

Add to `frontend/.env.local`:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-actual-google-client-id.apps.googleusercontent.com"
```

## 📘 Facebook OAuth Setup

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** > **Create App**
3. Choose **Consumer** app type
4. Fill in app details:
   - App name: `GRM Robotics`
   - Contact email: Your email

### Step 2: Configure Facebook Login

1. In your app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** platform
4. Enter Site URL: `http://localhost:3000` (development)

### Step 3: Configure App Settings

1. Go to **Settings** > **Basic**
2. Add **App Domains**: `localhost` (development)
3. Copy the **App ID**

### Step 4: Configure Valid OAuth Redirect URIs

1. Go to **Facebook Login** > **Settings**
2. Add **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/` (development)
   - `https://yourdomain.com/` (production)

### Step 5: Update Environment Variables

Add to `frontend/.env.local`:
```env
NEXT_PUBLIC_FACEBOOK_APP_ID="your-actual-facebook-app-id"
```

## 🚀 Testing OAuth Integration

### Test Google Login

1. Start the development server: `npm run dev`
2. Navigate to the login page
3. Click the **Google** button
4. Complete the OAuth flow
5. Verify user creation in database

### Test Facebook Login

1. Click the **Facebook** button on login page
2. Complete the OAuth flow
3. Verify user creation in database

## 🔒 Security Considerations

### Production Setup

1. **Update redirect URIs** to use HTTPS
2. **Restrict API keys** to specific domains
3. **Enable additional security features**:
   - Google: Enable **Authorized domains**
   - Facebook: Enable **App Secret Proof**

### Environment Variables for Production

```env
# Production environment variables
NEXT_PUBLIC_GOOGLE_CLIENT_ID="prod-google-client-id.apps.googleusercontent.com"
NEXT_PUBLIC_FACEBOOK_APP_ID="prod-facebook-app-id"
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Invalid client ID"**
   - Verify the client ID is correct
   - Check environment variable name
   - Ensure the app is published (Facebook)

2. **"Redirect URI mismatch"**
   - Add the exact URL to authorized redirect URIs
   - Include both HTTP and HTTPS for development

3. **"App not approved"**
   - Facebook apps need approval for production use
   - Submit for review with required permissions

### Debug Mode

Enable debug logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'oauth:*');
```

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🎯 Current Implementation Status

### ✅ **Backend Ready**
- OAuth endpoints (`/auth/google`, `/auth/facebook`) ✅
- User linking for existing accounts ✅
- JWT token generation ✅
- Database schema with OAuth support ✅

### ✅ **Frontend Ready**
- Google OAuth button component ✅
- Facebook OAuth button component ✅
- OAuth provider wrapper ✅
- Error handling and loading states ✅

### ⚙️ **Setup Required**
- Google Cloud Console configuration
- Facebook Developers configuration
- Environment variables setup
- OAuth app approval (for production)

### 🔧 **Current Behavior**
- OAuth buttons are visible and functional
- Clicking buttons shows setup instructions
- Backend endpoints are ready for OAuth tokens
- Database schema supports OAuth users

## 🔄 User Flow

1. User clicks OAuth button
2. Redirected to OAuth provider
3. User grants permissions
4. OAuth provider returns access token
5. Frontend sends token to backend
6. Backend verifies token with OAuth provider
7. Backend creates/updates user account
8. Backend returns JWT tokens
9. User is logged in and redirected

The OAuth integration is now complete and ready for testing!