#!/usr/bin/env python3
"""
F O C U S — Standalone APK Sender Tool
Sends a beautiful HTML email containing the Google Drive download link to bypass Gmail's 25MB limit.
"""

import os
import sys
import re
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

# ==============================================================================
# 🎯 EASY CONFIGURATION: EDIT YOUR DOWNLOAD LINK HERE
# ==============================================================================
DEFAULT_DOWNLOAD_LINK = "https://drive.google.com/file/d/1zvjZpJxgo3JPFqo8Y4RWXA8OubutDUqA/view?usp=sharing"
# ==============================================================================

# Reconfigure sys.stdout and sys.stderr to use UTF-8 on Windows CLI shells
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# Regex validation rules
EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
VERSION_REGEX = r"^v\d+(\.\d+)*(-[a-zA-Z0-9.]+)?$"

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

def parse_version(raw_version):
    """Smart version parser. Automatically expands '1' to 'v1.0.0', 'v1' to 'v1.0.0', '1.0' to 'v1.0.0' etc."""
    raw = raw_version.strip()
    if not raw:
        return "v1.0.0"

    # Remove 'v' or 'V' prefix if the user supplied it (we'll format it back later)
    has_v = False
    if raw.lower().startswith('v'):
        raw = raw[1:]
        has_v = True

    # Check if the remaining string starts with numeric digits
    match = re.match(r"^(\d+)(?:\.(\d+))?(?:\.(\d+))?(.*)$", raw)
    if match:
        major = match.group(1) or "1"
        minor = match.group(2) or "0"
        patch = match.group(3) or "0"
        suffix = match.group(4) or ""
        
        # Construct fully expanded semver tag
        return f"v{major}.{minor}.{patch}{suffix}"
    
    # Fallback to appending a 'v' if it is just a string and has no v prefix
    if not has_v:
        return f"v{raw}"
    return f"v{raw}"

def validate_inputs(recipient, download_url, version):
    """Perform input validations based on business rules."""
    # 1. Valid email format check
    if not re.match(EMAIL_REGEX, recipient):
        print("❌ Error: Invalid email format")
        sys.exit(1)

    # 2. Google Drive URL validation
    if not download_url.lower().startswith("https://drive.google.com"):
        print("❌ Error: Configured link must be a valid Google Drive URL")
        sys.exit(1)

    # 3. Version format check (e.g. v1.0.0)
    if not re.match(VERSION_REGEX, version):
        print("❌ Error: Invalid version format (e.g. v1.0.0)")
        sys.exit(1)

    return recipient, download_url, version

def get_html_body(download_url, app_version, user_name="Explorer", date_str=None):
    """Returns a highly aesthetic, premium, modern white/dark themed HTML email template with placeholders."""
    if not date_str:
        import datetime
        date_str = datetime.date.today().strftime("%B %d, %Y")
        
    html_template = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Focus Journey Starts Here</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #F8F8F8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #222222;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    a {
      text-decoration: none;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F8F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222222;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F8F8; padding: 40px 10px;">
    <tr>
      <td align="center" valign="top">
        <!-- Main Card Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #EAEAEA; overflow: hidden;">
          
          <!-- Top Branding Header -->
          <tr>
            <td align="center" style="padding: 45px 40px 25px 40px;">
              <!-- Logo Container -->
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #FC6E20; width: 56px; height: 56px; border-radius: 14px; text-align: center; vertical-align: middle;">
                    <img src="https://getfocus.online/favicon.png" width="32" height="32" alt="Focus App Logo" style="display: block; width: 32px; height: 32px; border: 0;" />
                  </td>
                </tr>
              </table>
              
              <!-- Large App Title -->
              <h1 style="font-size: 32px; font-weight: 800; color: #1B1B1B; margin: 18px 0 6px 0; letter-spacing: -0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Focus</h1>
              <!-- Subtitle -->
              <p style="font-size: 13px; color: #FC6E20; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">Your focus journey starts here</p>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <!-- Divider -->
              <hr style="border: 0; border-top: 1px solid #F0F0F0; margin: 0 0 35px 0;" />
              
              <!-- Welcome greeting -->
              <p style="font-size: 16px; line-height: 1.6; color: #222222; margin: 0 0 24px 0;">
                Hello {{USER_NAME}},
              </p>
              
              <!-- Section: Your request has been received -->
              <h2 style="font-size: 18px; font-weight: 700; color: #1B1B1B; margin: 0 0 10px 0;">✓ Your request has been received.</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #555555; margin: 0 0 35px 0;">
                We have successfully logged your application for the Focus early stage sandbox intake on <strong>{{DATE}}</strong>. Our team has reviewed your request, and your private mobile builder slot has been approved.
              </p>
              
              <!-- Section: APK Download -->
              <h2 style="font-size: 18px; font-weight: 700; color: #1B1B1B; margin: 0 0 10px 0;">📦 APK Download</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #555555; margin: 0 0 28px 0;">
                To bypass the standard 25MB email attachment limit and keep your setup secure, your private build package is hosted on Google Drive. Tap the download button below to load the release package directly onto your Android device:
              </p>
              
              <!-- CTA Button: Download APK -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0 35px 0;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 12px; background-color: #FC6E20;">
                          <a href="{{APK_LINK}}" target="_blank" style="display: inline-block; padding: 16px 40px; font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 12px; background-color: #FC6E20; border: 1px solid #FC6E20; transition: all 0.2s ease-in-out;">Download APK</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Pro tip instructions -->
              <div style="background-color: #FDF4F0; border-left: 4px solid #FC6E20; padding: 18px; border-radius: 0 12px 12px 0; margin-bottom: 20px;">
                <p style="font-size: 13.5px; line-height: 1.5; color: #5C2D16; margin: 0; font-weight: 500;">
                  <strong>Quick Install Tip:</strong> If your browser prompts you with a security warning regarding "Unknown Sources", rest assured this is completely normal for private developer release builds. Simply toggle permission for your browser and continue the installation.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Modern Footer Block -->
          <tr>
            <td align="center" style="background-color: #1B1B1B; padding: 45px 40px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <h3 style="color: #FFFFFF; font-size: 18px; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.2px;">Focus</h3>
              <p style="color: #A0A0A0; font-size: 12px; margin: 0 0 20px 0; font-style: italic;">Small steps. Big change.</p>
              
              <div style="height: 1px; background-color: #333333; margin: 25px 0;"></div>
              
              <!-- Support Footer Link -->
              <p style="color: #888888; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                Need help setting up or have questions?<br />
                Reach us directly at <a href="mailto:support@getfocus.online" style="color: #FC6E20; text-decoration: none; font-weight: 600;">support@getfocus.online</a>
              </p>
              
              <!-- Brand copyright -->
              <p style="color: #555555; font-size: 11px; margin: 15px 0 0 0;">
                © Focus App &bull; All Rights Reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

    # Populate placeholders
    html = html_template.replace("{{USER_NAME}}", user_name)
    html = html.replace("{{APK_LINK}}", download_url)
    html = html.replace("{{DATE}}", date_str)
    return html

def send_email(config, recipient, download_url, version, user_name="Explorer"):
    """Establishes connection to SMTP and sends the early access link email."""
    mail_user = config['MAIL_USER']
    mail_pass = config['MAIL_PASS']
    
    if not mail_user or not mail_pass:
        print("❌ Error: SMTP auth failed — check your .env credentials")
        sys.exit(1)

    # 1. Create email content
    msg = MIMEMultipart()
    # Format Sender address to display customized friendly name
    msg['From'] = f"Focus App <{mail_user}>"
    msg['To'] = recipient
    msg['Subject'] = "Your Focus App is Ready ✦"
    
    # Attach body HTML
    html_body = get_html_body(download_url, version, user_name=user_name)
    msg.attach(MIMEText(html_body, 'html'))
    
    # 2. Establish connection and send
    server = None
    try:
        host = config['MAIL_HOST']
        port = int(config['MAIL_PORT'])
        secure = config['MAIL_SECURE']
        
        if secure:
            server = smtplib.SMTP_SSL(host, port, timeout=30)
        else:
            server = smtplib.SMTP(host, port, timeout=30)
            server.starttls()
            
        # Login
        server.login(mail_user, mail_pass)
        
        # Send
        server.sendmail(mail_user, recipient, msg.as_string())
        print(f"\n✅ App link successfully sent to {recipient}")
        
    except smtplib.SMTPAuthenticationError:
        print("❌ Error: SMTP auth failed — check your .env credentials")
        sys.exit(1)
    except (smtplib.SMTPConnectError, ConnectionError, TimeoutError, socket.timeout if 'socket' in globals() else Exception) as e:
        print("❌ Error: Network issue — check your internet connection")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: Failed to send email: {e}")
        sys.exit(1)
    finally:
        if server:
            try:
                server.quit()
            except Exception:
                pass

def main():
    print("======================================")
    print("   F O C U S — APK Sender Tool")
    print("   support@getfocus.online")
    print("======================================")
    print()
    
    # Load config
    config = load_config()
    
    # Use easily editable default link
    download_url = DEFAULT_DOWNLOAD_LINK
    
    # Prompt sequential inputs
    try:
        recipient = input("Enter recipient email address:\n> ").strip()
        user_name = input("\nEnter recipient name (optional, press Enter to auto-extract):\n> ").strip()
        if not user_name:
            user_name = recipient.split('@')[0].capitalize()
        raw_version = input("\nEnter app version (e.g. 1 or v1.0.0):\n> ").strip()
    except (KeyboardInterrupt, EOFError):
        print("\nOperation cancelled by user.")
        sys.exit(0)
        
    # Smart parsing of version
    version = parse_version(raw_version)
    if version != raw_version:
        print(f"🤖 Smart parsed version: '{raw_version}' ➔ '{version}'")
        
    # Validations
    recipient, download_url, version = validate_inputs(recipient, download_url, version)
    
    # Print confirmation
    print("\n--------------------------------------")
    print("📦 Ready to send:")
    print(f"   To      : {recipient}")
    print(f"   Name    : {user_name}")
    print(f"   Version : {version}")
    
    # Truncate link in summary for visual presentation if long
    summary_link = download_url
    if len(summary_link) > 35:
        summary_link = summary_link[:25] + "..." + summary_link[-8:]
    print(f"   Link    : {summary_link}")
    print()
    
    try:
        confirm = input("Confirm? (y/n): ").strip().lower()
    except (KeyboardInterrupt, EOFError):
        print("\nOperation cancelled.")
        sys.exit(0)
        
    if confirm not in ('y', 'yes'):
        print("Sending cancelled.")
        sys.exit(0)
        
    print("\nSending email...")
    send_email(config, recipient, download_url, version, user_name=user_name)

if __name__ == "__main__":
    import socket # Ensure socket is imported for connection exception handling
    main()
