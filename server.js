import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Request Access API endpoint
app.post('/api/request-access', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    occupation,
    country,
    city,
    source,
    reason
  } = req.body;

  // Basic Server-side Validation
  if (!fullName || !email || !country || !city) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields (Full Name, Email, Country, and City).'
    });
  }

  // Get Client IP Address
  let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  if (clientIp.includes('::ffff:')) {
    clientIp = clientIp.split('::ffff:')[1];
  }
  if (clientIp === '::1' || clientIp === '127.0.0.1') {
    clientIp = 'Localhost (Development)';
  }

  // Attempt Geo IP Location lookup for metadata comparison
  let systemLocation = 'Unknown';
  if (clientIp && clientIp !== 'Localhost (Development)') {
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${clientIp}`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.status === 'success') {
          systemLocation = `${geoData.city || 'Unknown'}, ${geoData.country || 'Unknown'}`;
        }
      }
    } catch (err) {
      console.error('Geo IP Lookup failed:', err);
    }
  } else {
    systemLocation = 'Localhost (Development Environment)';
  }

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  // Setup Nodemailer Transporter
  // Using Hostinger SMTP standard settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true for port 465 (SSL)
    auth: {
      user: 'support@getfocus.online',
      pass: process.env.MAIL_PASS
    }
  });

  // Construct Premium HTML Email Body
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Focus Waiting List Signup</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #121212;
          color: #FFE7D0;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #1B1B1B;
          border: 1px solid rgba(255, 231, 208, 0.1);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .header {
          background-color: #FC6E20;
          background-image: linear-gradient(135deg, #FC6E20 0%, #d85714 100%);
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-family: 'Georgia', serif;
          font-size: 24px;
          color: #1B1B1B;
          letter-spacing: 1px;
          font-weight: bold;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 13px;
          color: rgba(27, 27, 27, 0.8);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
        }
        .content {
          padding: 30px 24px;
        }
        .intro {
          font-size: 16px;
          line-height: 1.6;
          color: #FFE7D0;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 231, 208, 0.05);
          padding-pb: 16px;
        }
        .field-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .field-table tr {
          border-bottom: 1px solid rgba(255, 231, 208, 0.05);
        }
        .field-table td {
          padding: 12px 6px;
          vertical-align: top;
          font-size: 14px;
        }
        .field-label {
          width: 180px;
          font-weight: bold;
          color: #FC6E20;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 1px;
        }
        .field-value {
          color: #FFE7D0;
          line-height: 1.5;
        }
        .field-value.highlight {
          font-weight: 600;
          color: #FFF;
        }
        .reason-box {
          background-color: rgba(255, 231, 208, 0.03);
          border-left: 3px solid #FC6E20;
          padding: 16px;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          font-size: 13.5px;
          color: rgba(255, 231, 208, 0.9);
          line-height: 1.6;
        }
        .metadata-section {
          background-color: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 231, 208, 0.05);
          padding: 20px 24px;
        }
        .metadata-section h3 {
          margin: 0 0 12px 0;
          font-size: 12px;
          color: #FC6E20;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .metadata-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          font-size: 12px;
          color: rgba(255, 231, 208, 0.6);
        }
        .metadata-item span {
          display: block;
          color: #FFE7D0;
          font-weight: 500;
          margin-top: 2px;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 11px;
          color: rgba(255, 231, 208, 0.4);
          background-color: rgba(0, 0, 0, 0.1);
          border-top: 1px solid rgba(255, 231, 208, 0.05);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✦ FOCUS WAITING LIST ✦</h1>
          <p>Waiting List Applicant Intake</p>
        </div>
        <div class="content">
          <div class="intro">
            A new candidate has signed up for the <strong>Focus Motivation App waiting list</strong>. Below are the intake parameters for your review.
          </div>
          <table class="field-table">
            <tr>
              <td class="field-label">Full Name</td>
              <td class="field-value highlight">${fullName}</td>
            </tr>
            <tr>
              <td class="field-label">Email Address</td>
              <td class="field-value highlight">
                <a href="mailto:${email}" style="color: #FC6E20; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td class="field-label">Phone / WhatsApp</td>
              <td class="field-value">${phone || '<em>Not Provided</em>'}</td>
            </tr>
            <tr>
              <td class="field-label">Occupation / Role</td>
              <td class="field-value">${occupation || '<em>Not Provided</em>'}</td>
            </tr>
            <tr>
              <td class="field-label">User Declared Location</td>
              <td class="field-value">${city}, ${country}</td>
            </tr>
            <tr>
              <td class="field-label">Referral Source</td>
              <td class="field-value">${source || '<em>Not Provided</em>'}</td>
            </tr>
            ${reason ? `
            <tr>
              <td class="field-label" style="padding-top: 20px;">Why join the waiting list?</td>
              <td style="padding-top: 20px;">
                <div class="reason-box">"${reason}"</div>
              </td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div class="metadata-section">
          <h3>System Geolocation & Metadata</h3>
          <div class="metadata-grid">
            <div class="metadata-item">
              Sender IP Address
              <span>${clientIp}</span>
            </div>
            <div class="metadata-item">
              Resolved Country/City
              <span>${systemLocation}</span>
            </div>
            <div class="metadata-item" style="grid-column: span 2;">
              Submission Timestamp (IST)
              <span>${timestamp}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          Focus App Sanctuary Platform &bull; Secure Local Database System
        </div>
      </div>
    </body>
    </html>
  `;

  // Define Email Message Structure
  const mailOptions = {
    from: `"Focus Waiting List" <support@getfocus.online>`,
    to: 'ashazpathan8@gmail.com',
    subject: `✦ Waiting List Signup: ${fullName} (${city}, ${country})`,
    text: `Focus Waiting List Signup Received!\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nOccupation: ${occupation || 'N/A'}\nUser Location: ${city}, ${country}\nSource: ${source || 'N/A'}\nReason: ${reason || 'N/A'}\n\nSystem Metadata:\nIP: ${clientIp}\nResolved Location: ${systemLocation}\nTimestamp: ${timestamp}`,
    html: htmlContent
  };

  try {
    // Send Email via SMTP
    await transporter.sendMail(mailOptions);
    console.log(`Access request email successfully sent for: ${fullName} (${email})`);

    return res.status(200).json({
      success: true,
      message: "We'll reach out soon ✦"
    });
  } catch (error) {
    console.error('Nodemailer SMTP Sending error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process request. Please try again later or reach out to support@getfocus.online directly.'
    });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Focus API Server is running on port ${PORT}`);
});
