import React from 'react'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Focus App — Privacy-First Offline Mood Tracker & Stoic Journal',
  description: 'Cultivate mindfulness in complete privacy with Focus. The premium offline mood tracker, stoic calligraphic daily quotes, and secure personal journal app for Android.',
  keywords: [
    "Focus App",
    "Mindful Offline Growth",
    "No Account Self Improvement",
    "Zero Telemetry Mood Tracker",
    "Calligraphy Daily Quotes",
    "Book Style Aesthetic Journal",
    "Single Log Mood Tracker",
    "Offline Habit Badges",
    "Quiet Hours Quotes Reminder",
    "No Subscription Mood Tracker",
    "Offline Diary App Android",
    "Habit Streak Tracker Android",
    "Daylio Alternative Offline",
    "Ad Free Journaling App",
    "No Login Required Journal App",
    "Lightweight Productivity App Android",
    "Dark Mode Journaling App",
    "Gamified Self Improvement App",
    "Daily Reflection Journal App",
    "Private Mental Wellness App",
    // Localized and expanded geo keywords
    "privacy-first mood tracker USA",
    "Stoic journal app United Kingdom",
    "offline diary companion Canada",
    "mental health tracker Australia",
    "local-first mood journal India",
    "secure offline reflection Germany",
    "private self improvement app Europe",
    "Daylio alternative no account",
    "best offline Stoicism diary 2026"
  ],
  metadataBase: new URL('https://getfocus.online'),
  alternates: {
    canonical: '/',
  },
  other: {
    "geo.region": "US;GB;CA;AU;IN;DE",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "DC.title": "Focus App — Privacy-First Offline Mood Tracker & Stoic Journal",
    "DC.creator": "Focus App",
    "DC.language": "en-US"
  },
  openGraph: {
    title: 'Focus App — Privacy-First Offline Mood Tracker & Stoic Journal',
    description: 'Cultivate mindfulness in complete privacy with Focus. The premium offline mood tracker, stoic calligraphic daily quotes, and secure personal journal app for Android.',
    url: 'https://getfocus.online',
    siteName: 'Focus App',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App - Privacy-First Offline Mood Tracker & Stoic Journal Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App — Privacy-First Offline Mood Tracker & Stoic Journal',
    description: 'Cultivate mindfulness in complete privacy with Focus. The premium offline mood tracker, stoic calligraphic daily quotes, and secure personal journal app for Android.',
    images: ['https://getfocus.online/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H8RH28HN19"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-H8RH28HN19');
            `,
          }}
        />
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
        <Analytics />
      </body>
    </html>
  )
}
