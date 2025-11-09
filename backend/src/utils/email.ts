import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'infogrmrobotics@gmail.com',
    pass: process.env.SMTP_PASS || '', // Add app password in .env
  },
});

// Send order notification to admin
export async function sendOrderNotification(orderData: any) {
  const adminEmail = 'infogrmrobotics@gmail.com';

  const mailOptions = {
    from: process.env.SMTP_USER || 'infogrmrobotics@gmail.com',
    to: adminEmail,
    subject: `🎉 New Order #${orderData.orderNumber} - GRM Robotics`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { background: #0ea5e9; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; margin-top: 20px; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Order Received!</h1>
            <p>Order #${orderData.orderNumber}</p>
          </div>
          <div class="content">
            <h2>Order Details</h2>
            <div class="order-details">
              <p><strong>Customer:</strong> ${orderData.user.firstName} ${orderData.user.lastName}</p>
              <p><strong>Email:</strong> ${orderData.user.email}</p>
              <p><strong>Phone:</strong> ${orderData.shippingAddress.phone || 'N/A'}</p>
              <p><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> ${orderData.status}</p>
            </div>

            <h3>Items Ordered:</h3>
            <div class="order-details">
              ${orderData.items.map((item: any) => `
                <div class="item">
                  <p><strong>${item.productName}</strong></p>
                  <p>SKU: ${item.productSku}</p>
                  <p>Quantity: ${item.quantity} × ₹${item.price} = ₹${item.total}</p>
                </div>
              `).join('')}
            </div>

            <h3>Shipping Address:</h3>
            <div class="order-details">
              <p>${orderData.shippingAddress.name}</p>
              <p>${orderData.shippingAddress.address}</p>
              <p>${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.pincode}</p>
              <p>Phone: ${orderData.shippingAddress.phone}</p>
            </div>

            <div class="total">
              Total Amount: ₹${orderData.total}
            </div>

            <center>
              <a href="http://localhost:3000/admin/orders" class="button">View Order in Admin Panel</a>
            </center>
          </div>
          <div class="footer">
            <p>GRM Robotics - STEM Education & Robotics Kits</p>
            <p>This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order notification sent to ${adminEmail}`);
  } catch (error) {
    console.error('Failed to send order notification:', error);
  }
}

// Send order confirmation to customer
export async function sendOrderConfirmation(orderData: any) {
  const customerEmail = orderData.user.email;

  const mailOptions = {
    from: process.env.SMTP_USER || 'infogrmrobotics@gmail.com',
    to: customerEmail,
    subject: `Order Confirmation #${orderData.orderNumber} - GRM Robotics`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 15px 0; }
          .item:last-child { border-bottom: none; }
          .total { background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; margin-top: 20px; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Order Confirmed!</h1>
            <p>Thank you for your order</p>
          </div>
          <div class="content">
            <p>Hi ${orderData.user.firstName},</p>
            <p>Your order has been confirmed and is being processed. We'll send you another email when your order ships.</p>

            <h2>Order #${orderData.orderNumber}</h2>
            <div class="order-details">
              <p><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> ${orderData.status}</p>
            </div>

            <h3>Items Ordered:</h3>
            <div class="order-details">
              ${orderData.items.map((item: any) => `
                <div class="item">
                  <p><strong>${item.productName}</strong></p>
                  <p>SKU: ${item.productSku}</p>
                  <p>Quantity: ${item.quantity} × ₹${item.price} = ₹${item.total}</p>
                </div>
              `).join('')}
            </div>

            <h3>Shipping Address:</h3>
            <div class="order-details">
              <p>${orderData.shippingAddress.name}</p>
              <p>${orderData.shippingAddress.address}</p>
              <p>${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.pincode}</p>
            </div>

            <div class="total">
              Total Paid: ₹${orderData.total}
            </div>

            <center>
              <a href="http://localhost:3000/orders" class="button">Track Your Order</a>
            </center>
          </div>
          <div class="footer">
            <p>GRM Robotics - STEM Education & Robotics Kits</p>
            <p>Need help? Contact us at grmrobotic@gmail.com | Phone: +91 9307720916</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation sent to ${customerEmail}`);
  } catch (error) {
    console.error('Failed to send order confirmation:', error);
  }
}

// Send welcome email to new users
export async function sendWelcomeEmail(email: string, firstName: string) {
  const mailOptions = {
    from: process.env.SMTP_USER || 'infogrmrobotics@gmail.com',
    to: email,
    subject: '🎉 Welcome to GRM Robotics!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .feature { padding: 15px 0; border-bottom: 1px solid #e5e7eb; }
          .feature:last-child { border-bottom: none; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to GRM Robotics!</h1>
            <p>Your journey into robotics starts here</p>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for joining GRM Robotics! We're excited to have you as part of our community.</p>
            
            <div class="features">
              <div class="feature">
                <h3>🤖 Explore Our Products</h3>
                <p>Browse our collection of robotics kits, sensors, and educational materials.</p>
              </div>
              <div class="feature">
                <h3>📚 Learn with Tutorials</h3>
                <p>Access free video tutorials and step-by-step guides.</p>
              </div>
              <div class="feature">
                <h3>🎓 Build Your Skills</h3>
                <p>From beginner to advanced, we have projects for every level.</p>
              </div>
              <div class="feature">
                <h3>💬 Get Support</h3>
                <p>Our team is here to help you succeed in your robotics journey.</p>
              </div>
            </div>

            <center>
              <a href="http://localhost:3000/products" class="button">Start Shopping</a>
            </center>

            <p style="margin-top: 30px;">If you have any questions, feel free to reach out to us anytime!</p>
          </div>
          <div class="footer">
            <p>GRM Robotics - STEM Education & Robotics Kits</p>
            <p>Contact: grmrobotic@gmail.com | Phone: +91 9307720916</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error - registration should succeed even if email fails
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_USER || 'infogrmrobotics@gmail.com',
    to: email,
    subject: '🔐 Password Reset Request - GRM Robotics',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hi,</p>
            <p>We received a request to reset your password for your GRM Robotics account.</p>
            
            <center>
              <a href="${resetUrl}" class="button">Reset Password</a>
            </center>

            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: white; padding: 10px; border-radius: 4px;">${resetUrl}</p>

            <div class="warning">
              <p><strong>⚠️ Important:</strong></p>
              <ul>
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Your password won't change until you create a new one</li>
              </ul>
            </div>

            <p>If you're having trouble, contact us at grmrobotic@gmail.com</p>
          </div>
          <div class="footer">
            <p>GRM Robotics - STEM Education & Robotics Kits</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}

// Send contact form notification to admin
export async function sendContactNotification(contactData: any) {
  const adminEmail = 'grmrobotic@gmail.com';

  const mailOptions = {
    from: process.env.SMTP_USER || 'infogrmrobotics@gmail.com',
    to: adminEmail,
    subject: `📧 New Contact Form Message - ${contactData.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
          .info-row { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .info-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Message</h1>
            <p>Someone has sent you a message from your website</p>
          </div>
          <div class="content">
            <h2>Contact Details</h2>
            <div class="message-box">
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${contactData.name}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${contactData.email}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">${contactData.phone}</span>
              </div>
              <div class="info-row">
                <span class="label">Subject:</span>
                <span class="value">${contactData.subject}</span>
              </div>
            </div>

            <h3>Message:</h3>
            <div class="message-box">
              <p style="white-space: pre-wrap;">${contactData.message}</p>
            </div>

            <p style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; font-size: 14px;">
              <strong>💡 Tip:</strong> Reply to this message by emailing ${contactData.email} directly.
            </p>
          </div>
          <div class="footer">
            <p>GRM Robotics - Contact Form Notification</p>
            <p>This is an automated notification from your website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact notification sent to ${adminEmail}`);
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    throw error;
  }
}

export default { sendOrderNotification, sendOrderConfirmation, sendWelcomeEmail, sendPasswordResetEmail, sendContactNotification };
