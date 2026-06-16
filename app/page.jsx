import React from 'react'
import HomeClient from './HomeClient'

export const metadata = {
  title: 'Focus App — Offline Mood Tracker & Stoic Journal | Android',
  description: 'Cultivate Stoic consistency in complete privacy. Focus is a 100% offline Android app for daily mood tracking, calligraphic quotes, and private journaling with zero cloud logs.',
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
    // Geo targeted and long-tail focus keywords
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
  alternates: {
    canonical: 'https://getfocus.online/',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "US;GB;CA;AU;IN;DE",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "author": 'Focus App',
    "language": 'English',
  },
  openGraph: {
    type: 'website',
    siteName: 'Focus App',
    title: 'Focus App — Offline Mood Tracker & Stoic Journal | Android',
    description: 'Cultivate Stoic consistency in complete privacy. Focus is a 100% offline Android app for daily mood tracking, calligraphic quotes, and private journaling with zero cloud logs.',
    url: 'https://getfocus.online/',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App — Offline Mood Tracker & Stoic Journal',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App — Offline Mood Tracker & Stoic Journal | Android',
    description: 'Cultivate Stoic consistency in complete privacy. Focus is a 100% offline Android app for daily mood tracking, calligraphic quotes, and private journaling with zero cloud logs.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Focus App",
  "operatingSystem": "Android",
  "applicationCategory": "Mindfulness, MentalWellnessApplication, ProductivityApplication",
  "applicationSubCategory": "Mindful Offline Growth & Stoic Reflection",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Focus is a state-of-the-art, 100% offline and privacy-first personal growth companion app for Android. Track daily moods, write book-grade journals, and cycle calligraphy stoic quotes completely offline.",
  "url": "https://getfocus.online",
  "screenshot": "https://getfocus.online/og-image.png",
  "creator": {
    "@type": "Organization",
    "name": "Focus App",
    "url": "https://getfocus.online",
    "email": "support@getfocus.online"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "People interested in Stoicism, mindfulness, offline journaling, and data privacy"
  },
  "featureList": [
    "Offline Calligraphy Daily Quotes",
    "Zero Telemetry Mood Tracker",
    "Book Style Aesthetic Journal",
    "Silent Habit Streak Tracker",
    "Gamified Offline Milestones & Achievements",
    "Quiet Hours Quotes Notification Filters",
    "Zero Cloud Sync & No Account Requirements",
    "Sandboxed Local SQLite Database Security"
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  )
}
