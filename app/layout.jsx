import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Focus — Mindful Offline Growth & Motivation Sanctuary',
  description: 'An elegant offline sanctuary to cultivate your daily presence. Read premium calligraphy quotes, journal private thoughts in complete safety, and trace precise daily mood cycles entirely offline.',
  icons: {
    icon: '/favicon.png',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts API */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Import premium fonts (Literata for Serif headers and Inter/Outfit for Sans body labels) */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Outfit:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
