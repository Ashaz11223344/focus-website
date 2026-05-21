import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Focus App – Mindful Offline Growth & Productivity',
  description: 'Focus helps users stay productive, reduce distractions, and build mindful offline habits.',
  keywords: [
    'Focus App',
    'Mindful Offline Growth',
    'No Account Self Improvement',
    'Zero Telemetry Mood Tracker',
    'Calligraphy Daily Quotes',
    'Book Style Aesthetic Journal',
    'Single Log Mood Tracker',
    'Offline Habit Badges',
    'Quiet Hours Quotes Reminder'
  ],
  alternates: {
    canonical: 'https://getfocus.online',
  },
  openGraph: {
    title: 'Focus App – Mindful Offline Growth & Productivity',
    description: 'Focus helps users stay productive, reduce distractions, and build mindful offline habits.',
    url: 'https://getfocus.online',
    siteName: 'Focus App',
    images: [
      {
        url: 'https://getfocus.online/logo.png',
        width: 1200,
        height: 630,
        alt: 'Focus App - Mindful Offline Growth & Productivity Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App – Mindful Offline Growth & Productivity',
    description: 'Focus helps users stay productive, reduce distractions, and build mindful offline habits.',
    images: ['https://getfocus.online/logo.png'],
  },
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Focus App',
  operatingSystem: 'Android, iOS',
  applicationCategory: 'ProductivityApplication',
  offers: {
    '@type': 'Offer',
    price: '0.00',
    priceCurrency: 'USD',
  },
  description: 'Focus helps users stay productive, reduce distractions, and build mindful offline habits.',
  url: 'https://getfocus.online',
  applicationSubCategory: 'Mindful Offline Growth & Productivity',
};

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

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
