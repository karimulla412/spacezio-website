const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config();

// Attempt to load Resend if available
let ResendClient = null;
try {
  const { Resend } = require('resend');
  ResendClient = Resend;
} catch (e) {
  // Resend optional
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'notifications@spacexio.com';
const PRIMARY_ADMIN = process.env.ADMIN_EMAIL || 'hellospacexio@gmail.com';
const ADMIN_EMAILS = [PRIMARY_ADMIN, 'rammputtepu@gmail.com'];

let resendInstance = null;
if (ResendClient && RESEND_API_KEY && !RESEND_API_KEY.startsWith('your_') && RESEND_API_KEY.startsWith('re_')) {
  try {
    resendInstance = new ResendClient(RESEND_API_KEY);
    console.log(`✅ Resend API configured with sender: ${SENDER_EMAIL}`);
  } catch (e) {
    console.warn('⚠️ Could not initialize Resend instance:', e.message);
  }
}

/**
 * Log inquiry to persistent alert file
 */
const logInquiryToFile = (subject, details) => {
  try {
    const logFile = path.join(__dirname, 'data', 'inquiry_alerts.log');
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    const entry = `[${new Date().toISOString()}] ${subject} | ${JSON.stringify(details)}\n`;
    fs.appendFileSync(logFile, entry);
  } catch (err) {
    console.error('Failed to write to inquiry_alerts.log:', err);
  }
};

/**
 * Send email using server sendmail binary
 */
const sendViaSendmail = (toEmail, subject, htmlContent) => {
  return new Promise((resolve, reject) => {
    const sendmailPaths = ['/usr/sbin/sendmail', '/usr/lib/sendmail', '/usr/bin/sendmail'];
    const sendmailBin = sendmailPaths.find(p => fs.existsSync(p));

    if (!sendmailBin) {
      return reject(new Error('Sendmail binary not found on system'));
    }

    const fromAddress = `Spacexio Platform <${SENDER_EMAIL}>`;
    const child = spawn(sendmailBin, ['-i', '-f', SENDER_EMAIL, toEmail]);

    const emailHeadersAndBody = [
      `To: ${toEmail}`,
      `From: ${fromAddress}`,
      `Reply-To: ${PRIMARY_ADMIN}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      htmlContent
    ].join('\r\n');

    let stderr = '';
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ status: 'success', method: 'sendmail', to: toEmail });
      } else {
        reject(new Error(`Sendmail exited with code ${code}: ${stderr}`));
      }
    });

    child.on('error', (err) => reject(err));

    child.stdin.write(emailHeadersAndBody);
    child.stdin.end();
  });
};

/**
 * Send email using PHP mail() fallback
 */
const sendViaPhpMail = (toEmail, subject, htmlContent) => {
  return new Promise((resolve, reject) => {
    const phpScript = `
      $to = "${toEmail.replace(/"/g, '\\"')}";
      $subject = "${subject.replace(/"/g, '\\"')}";
      $body = base64_decode("${Buffer.from(htmlContent).toString('base64')}");
      $headers = "From: Spacexio Platform <${SENDER_EMAIL}>\r\n" .
                 "Reply-To: ${PRIMARY_ADMIN}\r\n" .
                 "MIME-Version: 1.0\r\n" .
                 "Content-Type: text/html; charset=UTF-8\r\n" .
                 "Content-Transfer-Encoding: 8bit\r\n";
      $res = mail($to, $subject, $body, $headers, "-f ${SENDER_EMAIL}");
      echo $res ? "OK" : "FAIL";
    `;

    const child = spawn('php', ['-r', phpScript]);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    child.on('close', (code) => {
      if (code === 0 && stdout.includes('OK')) {
        resolve({ status: 'success', method: 'php_mail', to: toEmail });
      } else {
        reject(new Error(`PHP mail() failed with code ${code}: ${stderr || stdout}`));
      }
    });

    child.on('error', (err) => reject(err));
  });
};

/**
 * Unified Multi-Tier Email Dispatcher
 */
const sendEmailAsync = async (toEmail, subject, htmlContent) => {
  // 1. Try Resend if configured
  if (resendInstance) {
    try {
      const data = await resendInstance.emails.send({
        from: SENDER_EMAIL,
        to: [toEmail],
        subject: subject,
        html: htmlContent
      });
      console.log(`[Email:Resend] Dispatched to ${toEmail}: ${subject}`);
      return { status: 'success', method: 'resend', id: data.id };
    } catch (err) {
      console.warn(`[Email:Resend] Failed to send via Resend (${err.message}), falling back to server sendmail...`);
    }
  }

  // 2. Try native Linux sendmail
  try {
    const res = await sendViaSendmail(toEmail, subject, htmlContent);
    console.log(`[Email:Sendmail] Delivered to ${toEmail}: ${subject}`);
    return res;
  } catch (sendmailErr) {
    console.warn(`[Email:Sendmail] Failed (${sendmailErr.message}), falling back to PHP mail()...`);
  }

  // 3. Try PHP mail() bridge
  try {
    const res = await sendViaPhpMail(toEmail, subject, htmlContent);
    console.log(`[Email:PHPMail] Delivered to ${toEmail}: ${subject}`);
    return res;
  } catch (phpErr) {
    console.error(`[Email:AllFailed] Could not deliver email to ${toEmail}:`, phpErr.message);
  }

  return { status: 'logged_only', to: toEmail, subject };
};

/**
 * 1. Contact Form Notification
 */
const sendContactNotification = async (contactData) => {
  logInquiryToFile('Contact Inquiry', contactData);
  const subject = `📬 New Contact Inquiry from ${contactData.name || 'Website Visitor'}`;
  
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">📬 New Contact Inquiry</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0 0; font-size: 14px;">Spacexio Architecture & Construction Platform</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #27272a; padding-bottom: 10px;">Client Information</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa; width: 35%;">Client Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${contactData.name || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Phone Number:</td>
            <td style="padding: 10px 0; color: #fb923c; font-weight: bold; font-size: 16px;">
              <a href="tel:${contactData.phone}" style="color: #fb923c; text-decoration: none;">📞 ${contactData.phone || 'Not provided'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Email Address:</td>
            <td style="padding: 10px 0; color: #ffffff;">
              <a href="mailto:${contactData.email}" style="color: #ea580c; text-decoration: none;">${contactData.email || 'Not provided'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Service Requested:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${contactData.service || 'General Inquiry'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Company / Plot:</td>
            <td style="padding: 10px 0; color: #ffffff;">${contactData.company || 'Individual Owner'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0 6px 0; color: #a1a1aa; vertical-align: top;">Project Message:</td>
            <td style="padding: 12px 0 6px 0; color: #e4e4e7; line-height: 1.6; background-color: #27272a; border-radius: 8px; padding: 12px; margin-top: 4px;">
              ${contactData.message || 'No additional message provided.'}
            </td>
          </tr>
        </table>

        <div style="margin-top: 28px; text-align: center;">
          <a href="https://wa.me/91${(contactData.phone || '').replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">
            💬 Chat on WhatsApp
          </a>
          <a href="tel:${contactData.phone}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
            📞 Call Client Now
          </a>
        </div>

        <div style="margin-top: 24px; padding: 14px; background-color: #27272a; border-left: 4px solid #ea580c; border-radius: 6px; font-size: 12px; color: #d4d4d8;">
          ⏰ <strong>SLA Requirement:</strong> Please reach out to this homeowner within 24 hours to maintain our 4.9/5 response commitment.
        </div>
      </div>
      <div style="padding: 16px 24px; background-color: #121215; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #27272a;">
        Spacexio Studio & Engineering Desk • Visakhapatnam, Andhra Pradesh
      </div>
    </div>
  </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, subject, htmlContent);
  }
};

/**
 * 2. Chatbot Assistant Inquiry Notification
 */
const sendChatbotNotification = async (leadData) => {
  logInquiryToFile('Chatbot Inquiry', leadData);
  const subject = `🤖 New Spacexio Assistant Project Inquiry: ${leadData.contact}`;
  
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">🤖 New Assistant Project Lead</h1>
        <p style="color: rgba(255,255,255,0.95); margin: 6px 0 0 0; font-size: 14px;">Instant Website Chatbot Interaction</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #27272a; padding-bottom: 10px;">Project Requirements</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa; width: 35%;">Visitor Contact:</td>
            <td style="padding: 10px 0; color: #fb923c; font-weight: bold; font-size: 16px;">
              <a href="tel:${leadData.contact}" style="color: #fb923c; text-decoration: none;">📞 ${leadData.contact}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Project Type:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${leadData.projectType || 'Residential'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Approx Size:</td>
            <td style="padding: 10px 0; color: #ffffff;">${leadData.projectSize || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Service Required:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${leadData.serviceRequired || 'Architectural Design'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Timeline:</td>
            <td style="padding: 10px 0; color: #38bdf8; font-weight: bold;">${leadData.timeline || 'Immediate'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Capture Time:</td>
            <td style="padding: 10px 0; color: #a1a1aa;">${new Date().toLocaleString()}</td>
          </tr>
        </table>

        <div style="margin-top: 28px; text-align: center;">
          <a href="https://wa.me/91${(leadData.contact || '').replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">
            💬 WhatsApp Lead
          </a>
          <a href="tel:${leadData.contact}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
            📞 Call Now
          </a>
        </div>
      </div>
      <div style="padding: 16px 24px; background-color: #121215; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #27272a;">
        Spacexio Real-Time Inbound Lead Engine • Visakhapatnam
      </div>
    </div>
  </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, subject, htmlContent);
  }
};

/**
 * 3. Site Visit Booking Notification
 */
const sendSiteVisitNotification = async (bookingData) => {
  logInquiryToFile('Site Visit Booking', bookingData);
  const subject = `🏗️ New Site Visit Booking: ${bookingData.name} (${bookingData.plotLocation || 'Visakhapatnam'})`;
  
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div style="background: linear-gradient(135deg, #ea580c 0%, #b45309 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">🏗️ Site Visit Inspection Booked</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0 0; font-size: 14px;">Plot Feasibility & Soil Assessment Request</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #27272a; padding-bottom: 10px;">Booking Details</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa; width: 35%;">Client Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${bookingData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Phone Number:</td>
            <td style="padding: 10px 0; color: #fb923c; font-weight: bold; font-size: 16px;">
              <a href="tel:${bookingData.phone}" style="color: #fb923c; text-decoration: none;">📞 ${bookingData.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Email Address:</td>
            <td style="padding: 10px 0; color: #ffffff;">${bookingData.email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Plot Location:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">📍 ${bookingData.plotLocation || 'Visakhapatnam'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Plot Dimensions:</td>
            <td style="padding: 10px 0; color: #ffffff;">${bookingData.plotSize || 'Standard Plot'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Package Interest:</td>
            <td style="padding: 10px 0; color: #f59e0b; font-weight: bold;">${bookingData.packageInterest || 'Premium Package'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa;">Preferred Schedule:</td>
            <td style="padding: 10px 0; color: #38bdf8; font-weight: bold;">📅 ${bookingData.preferredDate || 'Flexible'} (${bookingData.preferredTime || 'Morning'})</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a1a1aa; vertical-align: top;">Notes:</td>
            <td style="padding: 10px 0; color: #d4d4d8;">${bookingData.message || 'No additional remarks.'}</td>
          </tr>
        </table>

        <div style="margin-top: 28px; text-align: center;">
          <a href="https://wa.me/91${(bookingData.phone || '').replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">
            💬 WhatsApp Client
          </a>
          <a href="tel:${bookingData.phone}" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
            📞 Call & Confirm Slot
          </a>
        </div>
      </div>
      <div style="padding: 16px 24px; background-color: #121215; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #27272a;">
        Spacexio Field Operations • Akkayyapalem, Visakhapatnam
      </div>
    </div>
  </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, subject, htmlContent);
  }
};

/**
 * 4. Lead Magnet Download Alert
 */
const sendLeadMagnetEmail = async (email, name, phone) => {
  logInquiryToFile('Lead Magnet Download', { email, name, phone });
  const adminSubject = `📘 New Guide Download: ${name || 'Prospective Client'} (${email})`;
  
  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden;">
      <div style="background: #ea580c; padding: 24px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0;">📘 New Construction Guide Download</h2>
      </div>
      <div style="padding: 24px;">
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#fb923c;">${email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${phone}" style="color:#fb923c;">${phone || 'Not provided'}</a></p>
        <p><strong>Guide:</strong> Spacexio Turnkey Construction & Estimation Guide</p>
        <p style="color:#a1a1aa; font-size:12px;">Captured at: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, adminSubject, adminHtml);
  }
};

/**
 * 5. Newsletter Subscription Alert
 */
const sendNewsletterWelcome = async (email) => {
  logInquiryToFile('Newsletter Subscription', { email });
  const adminSubject = `📰 New Newsletter Subscriber: ${email}`;
  
  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background-color: #09090b; color: #f4f4f5; padding: 20px;">
    <div style="max-width: 500px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; padding: 20px; border-radius: 12px;">
      <h3 style="color: #ea580c; margin-top: 0;">📰 New Newsletter Subscriber</h3>
      <p>A new visitor has subscribed to Spacexio construction & design updates:</p>
      <p style="font-size: 16px; font-weight: bold; color: #ffffff;">${email}</p>
      <p style="color: #71717a; font-size: 12px;">Time: ${new Date().toLocaleString()}</p>
    </div>
  </body>
  </html>
  `;

  for (const adminEmail of ADMIN_EMAILS) {
    await sendEmailAsync(adminEmail, adminSubject, adminHtml);
  }
};

/**
 * 6. Quick Query / Status Check Alert
 */
const sendStatusCheckNotification = async (statusData) => {
  logInquiryToFile('Quick Query', statusData);
  const subject = `⚡ Quick Platform Query from ${statusData.client_name || 'Website Visitor'}`;
  
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background-color: #09090b; color: #f4f4f5; padding: 20px;">
    <div style="max-width: 500px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; padding: 20px; border-radius: 12px;">
      <h3 style="color: #ea580c; margin-top: 0;">⚡ Quick Platform Query</h3>
      <p><strong>Client / Query:</strong> ${statusData.client_name}</p>
      <p style="color: #71717a; font-size: 12px;">Time: ${new Date().toLocaleString()}</p>
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
  sendChatbotNotification,
  sendSiteVisitNotification,
  sendLeadMagnetEmail,
  sendNewsletterWelcome,
  sendStatusCheckNotification
};
