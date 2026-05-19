#!/usr/bin/env python3
"""
Standalone Python APK Sender — app_sending_mail.py
A standalone Python CLI tool used privately by the developer to manually send
the Focus APK file to approved requesters via email.
"""

import os
import sys
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv

# Force UTF-8 encoding on standard output/error to prevent UnicodeEncodeError in Windows terminals
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Basic regex for email format validation
EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

def load_config():
    """Load configuration from .env file in the same directory as the script."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dotenv_path = os.path.join(script_dir, '.env')
    load_dotenv(dotenv_path)

    config = {
        'MAIL_USER': os.getenv("MAIL_USER"),
        'MAIL_PASS': os.getenv("MAIL_PASS"),
        'MAIL_HOST': os.getenv("MAIL_HOST", "smtp.zoho.in"),
        'MAIL_PORT': os.getenv("MAIL_PORT", "465"),
        'MAIL_SECURE': os.getenv("MAIL_SECURE", "true").lower() in ("true", "1", "yes")
    }
    return config

def validate_inputs(apk_path, recipient):
    """Validate user inputs: file path existence, .apk extension, and email format."""
    # 1. Clean path
    apk_path = apk_path.strip('\'"')
    
    # 2. Check if file exists
    if not os.path.exists(apk_path):
        print("❌ Error: File not found at given path")
        sys.exit(1)
        
    # 3. Check if file has .apk extension
    if not apk_path.lower().endswith('.apk'):
        print("❌ Error: File must have a .apk extension")
        sys.exit(1)

    # 4. Check email format
    if not re.match(EMAIL_REGEX, recipient):
        print("❌ Error: Invalid email format")
        sys.exit(1)

    return apk_path, recipient

def get_html_body():
    """Returns the beautifully styled, premium HTML body for the email."""
    return """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Focus App is Here ✦</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      color: #1f2937;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #f3f4f6;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
    }
    .header {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      padding: 40px 40px 35px 40px;
      text-align: center;
    }
    .logo-container {
      margin-bottom: 12px;
    }
    .logo-star {
      font-size: 28px;
      color: #a78bfa;
      vertical-align: middle;
      margin-left: 2px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 26px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .header p {
      color: #c7d2fe;
      font-size: 14px;
      margin: 8px 0 0 0;
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .content {
      padding: 40px;
    }
    .welcome-title {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .welcome-text {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 30px;
    }
    .steps-container {
      background-color: #f8fafc;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #f1f5f9;
      margin-bottom: 30px;
    }
    .steps-title {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .step-item {
      display: table;
      margin-bottom: 16px;
      width: 100%;
    }
    .step-item:last-child {
      margin-bottom: 0;
    }
    .step-number-cell {
      display: table-cell;
      width: 28px;
      vertical-align: top;
    }
    .step-number {
      background-color: #e0e7ff;
      color: #4f46e5;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      line-height: 22px;
    }
    .step-content-cell {
      display: table-cell;
      vertical-align: top;
      padding-left: 12px;
    }
    .step-text {
      font-size: 14px;
      line-height: 1.5;
      color: #334155;
      margin: 0;
    }
    .step-text strong {
      color: #0f172a;
    }
    .info-box {
      border-left: 4px solid #8b5cf6;
      background-color: #f5f3ff;
      padding: 16px 20px;
      border-radius: 0 12px 12px 0;
      margin-bottom: 30px;
    }
    .info-text {
      font-size: 14px;
      line-height: 1.5;
      color: #6d28d9;
      margin: 0;
      font-weight: 500;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px 40px;
      text-align: center;
      border-top: 1px solid #f3f4f6;
    }
    .branding-name {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
    }
    .branding-tagline {
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 16px 0;
      font-style: italic;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 16px 0;
    }
    .support-text {
      font-size: 12px;
      color: #9ca3af;
      margin: 0;
    }
    .support-link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <span style="color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -1px; font-family: sans-serif;">Focus</span><span class="logo-star">✦</span>
        </div>
        <p>Small steps. Big change.</p>
      </div>
      <div class="content">
        <h2 class="welcome-title">Your Focus App is Ready!</h2>
        <p class="welcome-text">
          Thank you for your interest in <strong>Focus</strong>. We are excited to help you take control of your time, build better habits, and reduce distractions. Below, you will find your standalone Android APK file attached directly to this email.
        </p>
        
        <div class="steps-container">
          <h3 class="steps-title">How to Install the APK</h3>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">1</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Enable Unknown Sources:</strong> Go to your Android settings, navigate to Security or Apps, and enable "Install from Unknown Sources" or allow your browser/email app to install unknown apps.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">2</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Download & Install:</strong> Tap on the attached <strong>focus.apk</strong> file in this email to download it to your device, then open the file to begin installation.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">3</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Launch & Focus:</strong> Open the Focus app from your app drawer, set up your workspace, and start your journey towards ultimate productivity.</p>
            </div>
          </div>
        </div>
        
        <div class="info-box">
          <p class="info-text">
            ✦ Need help? Feel free to reach out to us at any time. We'd love to hear your feedback on the app!
          </p>
        </div>
      </div>
      <div class="footer">
        <h4 class="branding-name">Focus</h4>
        <p class="branding-tagline">Small steps. Big change.</p>
        <div class="divider"></div>
        <p class="support-text">
          Have questions? Contact support at <a href="mailto:support@getfocus.online" class="support-link">support@getfocus.online</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
"""

def send_email(config, apk_path, recipient):
    """Establishes connection to SMTP and sends the APK email."""
    mail_user = config['MAIL_USER']
    mail_pass = config['MAIL_PASS']
    
    if not mail_user or not mail_pass:
        print("❌ Error: SMTP auth failed — check your .env credentials")
        sys.exit(1)

    filename = os.path.basename(apk_path)
    
    # 1. Create email content
    msg = MIMEMultipart()
    msg['From'] = mail_user
    msg['To'] = recipient
    msg['Subject'] = "Your Focus App is Here ✦"
    
    # Attach body HTML
    msg.attach(MIMEText(get_html_body(), 'html'))
    
    # Attach APK file
    try:
        with open(apk_path, "rb") as f:
            part = MIMEBase('application', 'vnd.android.package-archive')
            part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename="{filename}"')
            msg.attach(part)
    except Exception as e:
        print(f"❌ Error: Failed to read or attach the APK file: {e}")
        sys.exit(1)
        
    # 2. Establish connection and send
    server = None
    try:
        host = config['MAIL_HOST']
        port = int(config['MAIL_PORT'])
        secure = config['MAIL_SECURE']
        
        if secure:
            server = smtplib.SMTP_SSL(host, port, timeout=300)
        else:
            server = smtplib.SMTP(host, port, timeout=300)
            server.starttls()
            
        # Login
        server.login(mail_user, mail_pass)
        
        # Send
        server.sendmail(mail_user, recipient, msg.as_string())
        print(f"✅ App successfully sent to {recipient}")
        
    except smtplib.SMTPAuthenticationError:
        print("❌ Error: SMTP auth failed — check your .env credentials")
        sys.exit(1)
    except Exception as e:
        # Fallback details or socket/connection errors
        print(f"❌ Error: Connection or auth issue: {e}")
        sys.exit(1)
    finally:
        if server:
            try:
                server.quit()
            except Exception:
                pass

def main():
    print("✦ Focus APK Sender ✦\n")
    
    # Load env
    config = load_config()
    
    # Prompt sequential inputs
    try:
        apk_path_input = input("Step 1 → Enter APK file path:\n> ").strip()
        recipient_input = input("\nStep 2 → Enter recipient email address:\n> ").strip()
    except (KeyboardInterrupt, EOFError):
        print("\nOperation cancelled by user.")
        sys.exit(0)
        
    # Validations
    apk_path, recipient = validate_inputs(apk_path_input, recipient_input)
    
    # Print confirmation
    filename = os.path.basename(apk_path)
    print(f"\nReady to send {filename} to {recipient}")
    
    try:
        confirm = input("Confirm? (y/n): ").strip().lower()
    except (KeyboardInterrupt, EOFError):
        print("\nOperation cancelled.")
        sys.exit(0)
        
    if confirm not in ('y', 'yes'):
        print("Sending cancelled.")
        sys.exit(0)
        
    print("\nSending email...")
    send_email(config, apk_path, recipient)

if __name__ == "__main__":
    main()
