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

def get_html_body(download_url, app_version):
    """Returns a highly aesthetic, premium dark-themed HTML email template using the Focus color system."""
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Focus App is Ready ✦</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #1B1B1B;
      color: #FFE7D0;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }}
    .wrapper {{
      background-color: #1B1B1B;
      padding: 40px 20px;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      background-color: #323232;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(252, 110, 32, 0.4);
    }}
    .header {{
      background: linear-gradient(135deg, #FC6E20 0%, #1B1B1B 100%);
      padding: 50px 40px;
      text-align: center;
      position: relative;
    }}
    .badge-container {{
      position: absolute;
      top: 20px;
      right: 20px;
    }}
    .badge {{
      background-color: rgba(252, 110, 32, 0.2);
      color: #FC6E20;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid #FC6E20;
    }}
    .logo-container {{
      margin-bottom: 8px;
    }}
    .logo-star {{
      font-size: 28px;
      color: #FFE7D0;
      vertical-align: middle;
      margin-left: 4px;
    }}
    .header h1 {{
      color: #FFE7D0;
      font-size: 28px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.025em;
    }}
    .header p {{
      color: #FFE7D0;
      font-size: 14px;
      margin: 8px 0 0 0;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.9;
    }}
    .content {{
      padding: 40px;
    }}
    .welcome-title {{
      font-size: 22px;
      font-weight: 800;
      color: #FFE7D0;
      margin-top: 0;
      margin-bottom: 16px;
      letter-spacing: -0.025em;
    }}
    .welcome-text {{
      font-size: 15px;
      line-height: 1.6;
      color: rgba(255, 231, 208, 0.85);
      margin-bottom: 35px;
    }}
    .btn-container {{
      text-align: center;
      margin-bottom: 40px;
    }}
    .download-btn {{
      display: inline-block;
      background: linear-gradient(135deg, #FC6E20 0%, #d84b06 100%);
      color: #1B1B1B !important;
      font-size: 16px;
      font-weight: 800;
      text-decoration: none;
      padding: 16px 36px;
      border-radius: 12px;
      box-shadow: 0 10px 20px -5px rgba(252, 110, 32, 0.4);
      border: 1px solid #FFE7D0;
      transition: all 0.2s ease-in-out;
    }}
    .version-tag {{
      display: block;
      font-size: 12px;
      color: rgba(255, 231, 208, 0.6);
      margin-top: 10px;
      font-weight: 500;
    }}
    .steps-container {{
      background-color: #1B1B1B;
      border-radius: 16px;
      padding: 30px;
      border: 1px solid rgba(255, 231, 208, 0.1);
      margin-bottom: 35px;
    }}
    .steps-title {{
      font-size: 14px;
      font-weight: 700;
      color: #FFE7D0;
      margin-top: 0;
      margin-bottom: 24px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    .step-item {{
      display: table;
      margin-bottom: 20px;
      width: 100%;
    }}
    .step-item:last-child {{
      margin-bottom: 0;
    }}
    .step-number-cell {{
      display: table-cell;
      width: 32px;
      vertical-align: top;
    }}
    .step-number {{
      background-color: #FC6E20;
      color: #1B1B1B;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      text-align: center;
      font-size: 13px;
      font-weight: 800;
      line-height: 24px;
    }}
    .step-content-cell {{
      display: table-cell;
      vertical-align: top;
      padding-left: 14px;
    }}
    .step-text {{
      font-size: 14px;
      line-height: 1.5;
      color: rgba(255, 231, 208, 0.85);
      margin: 0;
    }}
    .step-text strong {{
      color: #FC6E20;
    }}
    .info-box {{
      border-left: 4px solid #FC6E20;
      background-color: rgba(252, 110, 32, 0.08);
      padding: 16px 20px;
      border-radius: 0 12px 12px 0;
      margin-bottom: 30px;
    }}
    .info-text {{
      font-size: 13.5px;
      line-height: 1.5;
      color: #FFE7D0;
      margin: 0;
      font-weight: 500;
    }}
    .footer {{
      background-color: #1B1B1B;
      padding: 35px 40px;
      text-align: center;
      border-top: 1px solid #323232;
    }}
    .branding-name {{
      font-size: 18px;
      font-weight: 800;
      color: #FFE7D0;
      margin: 0 0 4px 0;
      letter-spacing: -0.025em;
    }}
    .branding-tagline {{
      font-size: 13px;
      color: rgba(255, 231, 208, 0.6);
      margin: 0 0 20px 0;
      font-style: italic;
    }}
    .divider {{
      height: 1px;
      background-color: #323232;
      margin: 20px 0;
    }}
    .support-text {{
      font-size: 12px;
      color: rgba(255, 231, 208, 0.5);
      margin: 0;
    }}
    .support-link {{
      color: #FC6E20;
      text-decoration: none;
      font-weight: 600;
    }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="badge-container">
          <span class="badge">Early Access</span>
        </div>
        <div class="logo-container">
          <span style="color: #FFE7D0; font-size: 34px; font-weight: 800; letter-spacing: -0.05em; font-family: sans-serif;">Focus</span><span class="logo-star">✦</span>
        </div>
        <p>Small steps. Big change.</p>
      </div>
      <div class="content">
        <h2 class="welcome-title">Your Focus App is Ready!</h2>
        <p class="welcome-text">
          Thank you for joining the Focus early access program. We are excited to help you take control of your time, build better habits, and unlock high performance. 
          <br><br>
          We've bypassed standard attachment limits and hosted your private pre-release build securely on Google Drive. Tap the button below to download the application package directly to your Android device.
        </p>
        
        <div class="btn-container">
          <a href="{download_url}" class="download-btn">Download Focus App</a>
          <span class="version-tag">Release Build: <strong>{app_version}</strong></span>
        </div>
        
        <div class="steps-container">
          <h3 class="steps-title">Installation Guide</h3>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">1</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Tap Download:</strong> Click the "Download Focus App" button above to open the file link in Google Drive.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">2</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Open APK:</strong> Once the download completes, tap the file in your notification bar or "Downloads" folder.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">3</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Enable Permissions:</strong> If prompted by Android, grant permission to "Install from Unknown Sources" or authorize your browser to install apps.</p>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number-cell">
              <div class="step-number">4</div>
            </div>
            <div class="step-content-cell">
              <p class="step-text"><strong>Launch & Focus:</strong> Open the Focus app from your home screen and start your productivity journey!</p>
            </div>
          </div>
        </div>
        
        <div class="info-box">
          <p class="info-text">
            ✦ <strong>Note:</strong> Since this is a private early access pre-release, Google Play Protect might show a warning. Rest assured, this package is clean and compiled securely directly by the Focus team.
          </p>
        </div>
      </div>
      <div class="footer">
        <h4 class="branding-name">Focus</h4>
        <p class="branding-tagline">Small steps. Big change.</p>
        <div class="divider"></div>
        <p class="support-text">
          Need support? Reach us at <a href="mailto:support@getfocus.online" class="support-link">support@getfocus.online</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
"""

def send_email(config, recipient, download_url, version):
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
    html_body = get_html_body(download_url, version)
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
    send_email(config, recipient, download_url, version)

if __name__ == "__main__":
    import socket # Ensure socket is imported for connection exception handling
    main()
