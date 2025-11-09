# 📧 Setup Email Notifications

## 🎯 Why You're Not Getting Emails

Email notifications require SMTP configuration in your `.env` file. Currently, the emails are not configured, so they fail silently.

---

## ✅ QUICK SETUP (5 Minutes)

### **Step 1: Enable Gmail App Password**

1. **Go to your Gmail account:** infogrmrobotics@gmail.com

2. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

3. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "GRM Robotics Website"
   - Click "Generate"
   - **Copy the 16-character password** (looks like: xxxx xxxx xxxx xxxx)

---

### **Step 2: Update Backend .env File**

1. **Open:** `backend/.env`

2. **Add these lines:**
   ```env
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=infogrmrobotics@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```

3. **Replace** `xxxx xxxx xxxx xxxx` with your actual 16-character app password

4. **Save the file**

---

### **Step 3: Restart Backend Server**

1. **Stop backend:** Press `Ctrl+C` in backend terminal

2. **Start again:**
   ```bash
   cd backend
   npm run dev
   ```

---

### **Step 4: Test!**

1. **Go to contact page:**
   ```
   http://localhost:3000/contact
   ```

2. **Fill out the form:**
   - Name: Test User
   - Email: your-email@example.com
   - Subject: General Inquiry
   - Message: Testing email notifications

3. **Click "Send Message"**

4. **Check your email:** grmrobotic@gmail.com
   - Should receive notification within 1 minute!

---

## 📧 WHAT EMAILS WILL BE SENT

Once configured, you'll receive emails for:

### 1. **Contact Form Messages** ✅ (Just Added!)
- To: grmrobotic@gmail.com
- When: Someone submits contact form
- Contains: Name, email, phone, subject, message

### 2. **New Orders**
- To: infogrmrobotics@gmail.com
- When: Customer places order
- Contains: Order details, customer info, items

### 3. **Customer Emails**
- Order confirmations
- Welcome emails
- Password reset emails
- Shipment notifications

---

## 🔧 BACKEND .ENV EXAMPLE

Your `backend/.env` should look like this:

```env
# Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/grm_robotics

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=infogrmrobotics@gmail.com
SMTP_PASS=your-16-char-app-password

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 TESTING CHECKLIST

After setup, test these:

### Test 1: Contact Form
- [ ] Submit contact form
- [ ] Check grmrobotic@gmail.com
- [ ] Should receive notification

### Test 2: User Registration
- [ ] Register new user
- [ ] Check user's email
- [ ] Should receive welcome email

### Test 3: Order Placement
- [ ] Place test order
- [ ] Check infogrmrobotics@gmail.com
- [ ] Should receive order notification
- [ ] Check customer email
- [ ] Should receive order confirmation

---

## 🚨 TROUBLESHOOTING

### Issue 1: Not Receiving Emails

**Check:**
1. SMTP credentials correct in `.env`
2. Backend server restarted after adding credentials
3. Check spam folder
4. Check backend console for errors

**Test SMTP:**
```bash
# In backend terminal
node -e "console.log(process.env.SMTP_USER, process.env.SMTP_PASS)"
```
Should show your email and password.

---

### Issue 2: "Invalid Login" Error

**Solution:**
- Make sure 2FA is enabled on Gmail
- Generate a new app password
- Use the app password, NOT your Gmail password
- Remove any spaces from the password in .env

---

### Issue 3: Emails Going to Spam

**Solution:**
- Add infogrmrobotics@gmail.com to contacts
- Mark first email as "Not Spam"
- Future emails will go to inbox

---

## 💡 IMPORTANT NOTES

### **Security:**
- ✅ Never commit `.env` file to Git
- ✅ Use app password, not Gmail password
- ✅ Keep credentials secure

### **Gmail Limits:**
- Free Gmail: 500 emails/day
- Enough for small to medium business
- Upgrade to Google Workspace if needed

### **Email Addresses:**
- **infogrmrobotics@gmail.com** - Sends all emails
- **grmrobotic@gmail.com** - Receives contact form messages

---

## 📊 EMAIL FLOW

### Contact Form:
```
Customer fills form
    ↓
Saved to database
    ↓
Email sent to: grmrobotic@gmail.com
    ↓
You receive notification
    ↓
Reply to customer directly
```

### Order Placement:
```
Customer places order
    ↓
Payment successful
    ↓
Email to customer: Order confirmation
Email to admin: New order notification
    ↓
You process order
```

---

## ✅ QUICK SETUP SUMMARY

1. ✅ Enable 2FA on infogrmrobotics@gmail.com
2. ✅ Generate app password
3. ✅ Add to `backend/.env`:
   ```env
   SMTP_USER=infogrmrobotics@gmail.com
   SMTP_PASS=your-16-char-password
   ```
4. ✅ Restart backend server
5. ✅ Test contact form
6. ✅ Check grmrobotic@gmail.com for email!

---

## 🎯 AFTER SETUP

You'll receive emails for:
- ✅ Contact form submissions
- ✅ New orders
- ✅ Customer inquiries
- ✅ All important notifications

---

## 📞 NEED HELP?

If you're stuck:
1. Check backend console for errors
2. Verify SMTP credentials
3. Test with a simple email first
4. Check spam folder
5. Try generating new app password

---

**Setup takes 5 minutes and you'll never miss a customer message!** 📧✅

**Start with Step 1: Enable 2FA and generate app password!** 🚀
