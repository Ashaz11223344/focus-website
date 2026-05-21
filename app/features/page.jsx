import React from 'react'
import FeaturesClient from './FeaturesClient'

export const metadata = {
  title: 'Focus App Features — Quotes, Mood, Journal & More',
  description: 'Explore all 9 features of Focus: offline quotes, mood tracker, gamified streaks, reflective journal and more. No account needed.',
  alternates: {
    canonical: 'https://getfocus.online/features',
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
    title: 'Focus App Features — Quotes, Mood, Journal & More',
    description: 'Explore all 9 features of Focus: offline quotes, mood tracker, gamified streaks, reflective journal and more. No account needed.',
    url: 'https://getfocus.online/features',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App Features — Quotes, Mood, Journal & More',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App Features — Quotes, Mood, Journal & More',
    description: 'Explore all 9 features of Focus: offline quotes, mood tracker, gamified streaks, reflective journal and more. No account needed.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <FeaturesClient />
}
