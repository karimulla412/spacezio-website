# 📧 Email Setup Guide - Spacexio

## Current Status

✅ **Resend API Key Connected:** `re_XU7DvNM7_DoQuBbvCQX76VGt97sJEPTf6`
✅ **Email System Fully Coded:** All email templates and logic ready
⚠️ **Resend Test Mode Limitation:** Currently can only send to account owner email

## Why Emails Aren't Reaching Everyone

Resend has a **test mode limitation**:
- Free tier with `onboarding@resend.dev` sender can **only** send emails to the account owner's verified email
- To send emails to customers/users, you need to **verify a domain**

## 🎯 Solution: Verify Your Domain (5-10 minutes)

### Option 1: Verify spacexio.com Domain (Recommended)

**Step 1: Add Domain in Resend**
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `spacexio.com` (or your actual domain)
4. Click "Add"

**Step 2: Add DNS Records**
Resend will provide DNS records to add. Go to your domain provider (GoDaddy/Namecheap/Cloudflare):

Example DNS Records:
```
Type: TXT
Name: @
Value: resend-domain-verify=xxxxx

Type: MX
Name: @
Value: feedback-smtp.resend.com
Priority: 10
```

**Step 3: Update `.env` File**
After domain verification, update sender email:
```bash
# /app/backend/.env
SENDER_EMAIL=no-reply@spacexio.com
# or
SENDER_EMAIL=info@spacexio.com
```

**Step 4: Restart Backend**
```bash
sudo supervisorctl restart backend
```

### Option 2: Use Your Gmail (Quick Test Only)

For immediate testing, you can use the Resend account owner's email:

1. In Resend dashboard, find "Account Owner Email" (the email used to sign up)
2. All test emails will be sent to this email address
3. Update `/app/backend/email_service.py` if needed

**Note:** This is only for testing - not suitable for production.

## 🔍 How to Verify Emails Are Working

Once domain is verified, test with:

```bash
# Test Newsletter Subscription
curl -X POST https://your-domain.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","source":"website"}'

# Check logs
tail -f /var/log/supervisor/backend.err.log | grep email_service
```

You should see:
```
✅ Email sent successfully to customer@example.com: Welcome to Spacexio Insights!
```

## 📋 What Emails Are Configured

Once domain is verified, these emails will work automatically:

1. **Contact Form Submissions**
   - To: `hellospacexio@gmail.com` and `rammputtepu@gmail.com`
   - Contains: Customer details, service request, message

2. **Site Visit Bookings**
   - To: Admin emails
   - Contains: Name, phone, plot location, preferred date/time

3. **Newsletter Welcome**
   - To: Subscriber
   - Contains: Welcome message, links to latest insights

4. **Lead Magnet (PDF Guide)**
   - To: User (with PDF download link)
   - CC: Admin emails (notification of high-intent lead)

## 🎯 Current Configuration

```env
RESEND_API_KEY=re_XU7DvNM7_DoQuBbvCQX76VGt97sJEPTf6
SENDER_EMAIL=onboarding@resend.dev  ← Change after domain verification
```

## ⚡ Quick Reference

| Action | Command |
|--------|---------|
| Restart backend | `sudo supervisorctl restart backend` |
| Check email logs | `tail -f /var/log/supervisor/backend.err.log \| grep email` |
| Test newsletter | `curl -X POST API_URL/api/newsletter/subscribe -d '{"email":"test@example.com"}'` |
| View .env file | `cat /app/backend/.env` |

## 🆘 Need Help?

Common issues:
- **"Domain not verified"** → Add DNS records and wait 5-10 minutes
- **"Can only send to own email"** → Domain not verified yet
- **"Email failed"** → Check API key is correct in `.env`

---

**Next Step:** Verify your domain at https://resend.com/domains to enable emails for all users! 🚀
