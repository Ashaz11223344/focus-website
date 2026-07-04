import React from 'react'
import FeaturesClient from './FeaturesClient'

export const metadata = {
  title: 'Focus App Features — Offline Mood Tracker, Stoic Journal & Streaks',
  description: 'Explore all 9 premium features of Focus: offline calligraphy quotes, local-first mood tracker, gamified streaks, and sandboxed reflective journal. No accounts.',
  alternates: {
    canonical: '/features',
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
    title: 'Focus App Features — Offline Mood Tracker, Stoic Journal & Streaks',
    description: 'Explore all 9 premium features of Focus: offline calligraphy quotes, local-first mood tracker, gamified streaks, and sandboxed reflective journal. No accounts.',
    url: 'https://getfocus.online/features',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App Features — Offline Mood Tracker, Stoic Journal & Streaks',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App Features — Offline Mood Tracker, Stoic Journal & Streaks',
    description: 'Explore all 9 premium features of Focus: offline calligraphy quotes, local-first mood tracker, gamified streaks, and sandboxed reflective journal. No accounts.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <FeaturesClient />
}
