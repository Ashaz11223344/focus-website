import React from 'react'
import HomeClient from './HomeClient'

export const metadata = {
  title: 'Focus App — Offline Mood Tracker & Daily Quotes | Android',
  description: 'Focus: 100% offline Android app for daily mood tracking, calligraphy quotes & private journaling. No account. No tracking. No cloud.',
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
    "Private Mental Wellness App"
  ],
  alternates: {
    canonical: 'https://getfocus.online/',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    author: 'Focus App',
    language: 'English',
  },
  openGraph: {
    type: 'website',
    siteName: 'Focus App',
    title: 'Focus App — Offline Mood Tracker & Daily Quotes | Android',
    description: 'Focus: 100% offline Android app for daily mood tracking, calligraphy quotes & private journaling. No account. No tracking. No cloud.',
    url: 'https://getfocus.online/',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App — Offline Mood Tracker & Daily Quotes',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App — Offline Mood Tracker & Daily Quotes | Android',
    description: 'Focus: 100% offline Android app for daily mood tracking, calligraphy quotes & private journaling. No account. No tracking. No cloud.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Focus App",
  "operatingSystem": "Android, iOS",
  "applicationCategory": "ProductivityApplication",
  "applicationSubCategory": "Mindful Offline Growth & Productivity",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Focus helps users stay productive, reduce distractions, and build mindful offline habits.",
  "url": "https://getfocus.online",
  "screenshot": "https://getfocus.online/logo.png",
  "creator": {
    "@type": "Organization",
    "name": "Focus App",
    "url": "https://getfocus.online",
    "email": "support@getfocus.online"
  },
  "featureList": [
    "Offline Daily Quotes",
    "Mood Tracker",
    "Reflective Journal",
    "Habit Streak Tracker",
    "Gamified Badges",
    "Quiet Hours Notifications",
    "Zero Cloud Tracking",
    "No Account Required"
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
