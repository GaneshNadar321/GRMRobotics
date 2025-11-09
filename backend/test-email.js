const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('📧 Testing GRM Robotics Email Configuration...\n');

// Display current configuration (without showing password)
console.log('Current Email Configuration:');
console.log(`FROM: ${process.env.EMAIL_FROM || 'Not set'}`);
console.log(`HOST: ${process.env.EMAIL_HOST || 'Not set'}`);
console.log(`PORT: ${process.env.EMAIL_PORT || 'Not set'}`);
console.log(`USER: ${process.env.EMAIL_USER || 'Not set'}`);
console.log(`PASS: ${process.env.EMAIL_PASS ? '***configured***' : 'Not set'}\n`);

// Check if all required variables are set
const requiredVars = ['EMAIL_FROM', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\n📋 Please update your .env file with email configuration.');
  console.log('📖 See EMAIL_SETUP_GUIDE.md for detailed instructions.\n');
  process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug output
});

async function testEmail() {
  try {
    console.log('🔍 Verifying SMTP connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');
    
    // Prompt for test email address
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('📧 Enter your email address to receive test email: ', async (testEmail) => {
      rl.close();
      
      console.log(`\n📤 Sending test email to: ${testEmail}`);
      
      // Send test email
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: testEmail,
        subject: '🤖 GRM Robotics - Email Configuration Test',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">🤖 GRM Robotics</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Email Configuration Test</p>
            </div>
            
            <div style="padding: 30px; background: #f8f9fa;">
              <h2 style="color: #333; margin-top: 0;">✅ Email Configuration Successful!</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Congratulations! Your GRM Robotics platform email configuration is working correctly.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3 style="color: #28a745; margin-top: 0;">📊 Test Details:</h3>
                <ul style="color: #666; margin: 0;">
                  <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
                  <li><strong>From:</strong> ${process.env.EMAIL_FROM}</li>
                  <li><strong>SMTP Host:</strong> ${process.env.EMAIL_HOST}</li>
                  <li><strong>Port:</strong> ${process.env.EMAIL_PORT}</li>
                </ul>
              </div>
              
              <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1976d2; margin-top: 0;">🚀 What's Next?</h3>
                <p style="color: #666; margin: 0;">
                  Your platform can now send:
                </p>
                <ul style="color: #666;">
                  <li>Order confirmation emails</li>
                  <li>User registration verification</li>
                  <li>Password reset emails</li>
                  <li>Shipping notifications</li>
                  <li>Contact form responses</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #999; font-size: 14px;">
                  This is an automated test email from your GRM Robotics platform.
                </p>
              </div>
            </div>
          </div>
        `,
      });
      
      console.log('✅ Test email sent successfully!');
      console.log(`📧 Message ID: ${info.messageId}`);
      console.log(`📬 Check your inbox at: ${testEmail}\n`);
      
      console.log('🎉 Email configuration is working correctly!');
      console.log('📋 Your GRM Robotics platform is ready to send emails.\n');
    });
    
  } catch (error) {
    console.log('❌ Email test failed:');
    console.log(`   Error: ${error.message}\n`);
    
    // Provide helpful troubleshooting tips
    console.log('🔧 Troubleshooting Tips:');
    
    if (error.message.includes('Invalid login')) {
      console.log('   - Check your email username and password');
      console.log('   - For Gmail: Use App Password, not regular password');
      console.log('   - Enable 2-Factor Authentication first');
    } else if (error.message.includes('Connection timeout')) {
      console.log('   - Check SMTP host and port settings');
      console.log('   - Verify your internet connection');
      console.log('   - Check firewall settings');
    } else if (error.message.includes('Authentication failed')) {
      console.log('   - Verify your email credentials');
      console.log('   - For Gmail: Generate new App Password');
      console.log('   - For SendGrid: Check API key format');
    } else {
      console.log('   - Double-check all email configuration values');
      console.log('   - Refer to EMAIL_SETUP_GUIDE.md for detailed setup');
    }
    
    console.log('\n📖 For detailed setup instructions, see: EMAIL_SETUP_GUIDE.md');
  }
}

testEmail();