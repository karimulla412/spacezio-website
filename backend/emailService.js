const { Resend } = require('resend');
require('dotenv').config();

const RESEND_API_KEY = process.env.RESEND_API_KEY || 'your_api_key_here';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAILS = ["hellospacexio@gmail.com", "rammputtepu@gmail.com"];

const resend = new Resend(RESEND_API_KEY);

if (RESEND_API_KEY && RESEND_API_KEY !== 'your_api_key_here') {
  console.log(`✅ Resend API configured successfully with sender: ${SENDER_EMAIL}`);
} else {
  console.warn("⚠️ Resend API key not configured - emails will be logged only");
}

const sendEmailAsync = async (toEmail, subject, htmlContent) => {
  if (RESEND_API_KEY === 'your_api_key_here') {
    console.warn(`Email not sent (API key not configured): ${subject} to ${toEmail}`);
    return { status: "skipped", message: "Resend API key not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [toEmail],
      subject: subject,
      html: htmlContent
    });
    console.log(`Email sent successfully to ${toEmail}: ${subject}`);
    return { status: "success", message: `Email sent to ${toEmail}`, email_id: data.id };
  } catch (error) {
    console.error(`Failed to send email to ${toEmail}:`, error);
    return { status: "error", message: error.message };
  }
};

const sendContactNotification = async (contactData) => {
  const subject = `New Contact Inquiry from ${contactData.name}`;
  
  const htmlContent = `
  <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">New Contact Inquiry</h1>
          </div>
          <div style="padding: 30px; background-color: #f9fafb;">
              <h2 style="color: #1f2937;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Name:</td>
                      <td style="padding: 10px; color: #1f2937;">${contactData.name}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Email:</td>
                      <td style="padding: 10px; color: #1f2937;">${contactData.email}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Phone:</td>
                      <td style="padding: 10px; color: #1f2937;">${contactData.phone}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Service:</td>
                      <td style="padding: 10px; color: #1f2937;">${contactData.service}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Message:</td>
                      <td style="padding: 10px; color: #1f2937;">${contactData.message}</td>
                  </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                  <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
              </div>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #111827; color: #9ca3af; font-size: 12px;">
              <p>© 2025 Spacexio. All rights reserved.</p>
          </div>
      </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, subject, htmlContent);
  }
};

const sendSiteVisitNotification = async (bookingData) => {
  const subject = `New Site Visit Booking - ${bookingData.name}`;
  
  const htmlContent = `
  <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">🏗️ New Site Visit Booking</h1>
          </div>
          <div style="padding: 30px; background-color: #f9fafb;">
              <h2 style="color: #1f2937;">Booking Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Name:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.name}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Phone:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.phone}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Plot Location:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.plotLocation}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Plot Size:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.plotSize || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Package Interest:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.packageInterest || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Preferred Date:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.preferredDate || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Preferred Time:</td>
                      <td style="padding: 10px; color: #1f2937;">${bookingData.preferredTime || 'Not specified'}</td>
                  </tr>
              </table>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #111827; color: #9ca3af; font-size: 12px;">
              <p>© 2025 Spacexio. All rights reserved.</p>
          </div>
      </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, subject, htmlContent);
  }
};

const sendNewsletterWelcome = async (email) => {
  const subject = "Welcome to Spacexio Insights!";
  
  const htmlContent = `
  <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Spacexio!</h1>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Thank You for Subscribing! 🎉</h2>
              <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
                  We're excited to have you join our community.
              </p>
          </div>
      </body>
  </html>
  `;
  
  await sendEmailAsync(email, subject, htmlContent);
};

const sendLeadMagnetEmail = async (email, name) => {
  const subject = "Your Free Construction Planning Guide - Spacexio";
  
  const htmlContent = `
  <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 26px;">Your Guide is Ready! 📘</h1>
          </div>
          <div style="padding: 40px; background-color: #ffffff;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${name},</h2>
              <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #fef3c7; border-radius: 8px;">
                  <a href="https://spacexio.com/downloads/construction-planning-guide.pdf" style="background-color: #ea580c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                      Download PDF Guide
                  </a>
              </div>
          </div>
      </body>
  </html>
  `;
  
  await sendEmailAsync(email, subject, htmlContent);
  
  const adminSubject = `New Lead Magnet Download - ${name}`;
  const adminHtml = `
  <html>
      <body>
          <h2>New Lead Magnet Download</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
      </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, adminSubject, adminHtml);
  }
};

const sendChatbotNotification = async (leadData) => {
  const subject = `🤖 New Spacexio Assistant Inquiry from ${leadData.contact}`;
  
  const htmlContent = `
  <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">🤖 New Chatbot Project Lead</h1>
          </div>
          <div style="padding: 30px; background-color: #f9fafb;">
              <h2 style="color: #1f2937;">Lead Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Contact:</td>
                      <td style="padding: 10px; color: #1f2937;"><strong>${leadData.contact}</strong></td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Project Type:</td>
                      <td style="padding: 10px; color: #1f2937;">${leadData.projectType || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Project Size:</td>
                      <td style="padding: 10px; color: #1f2937;">${leadData.projectSize || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Service Required:</td>
                      <td style="padding: 10px; color: #1f2937;">${leadData.serviceRequired || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Timeline:</td>
                      <td style="padding: 10px; color: #1f2937;">${leadData.timeline || 'Not specified'}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; font-weight: bold; color: #4b5563;">Captured At:</td>
                      <td style="padding: 10px; color: #1f2937;">${new Date().toLocaleString()}</td>
                  </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                  <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Contact this lead within 24 hours.</p>
              </div>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #111827; color: #9ca3af; font-size: 12px;">
              <p>© 2026 Spacexio. All rights reserved.</p>
          </div>
      </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, subject, htmlContent);
  }
};

module.exports = {
  sendContactNotification,
  sendSiteVisitNotification,
  sendNewsletterWelcome,
  sendLeadMagnetEmail,
  sendChatbotNotification
};
