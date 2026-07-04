import React from 'react'
import PrivacyClient from './PrivacyClient'

export const metadata = {
  title: 'Privacy Policy & Security — Focus App',
  description: 'Focus is built on a 100% offline database model with zero data tracking. Your journals, daily moods, and configuration settings never leave your device.',
  alternates: {
    canonical: '/privacy',
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
    title: 'Privacy Policy & Security — Focus App',
    description: 'Focus is built on a 100% offline database model with zero data tracking. Your journals, daily moods, and configuration settings never leave your device.',
    url: 'https://getfocus.online/privacy',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy & Security — Focus App',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy & Security — Focus App',
    description: 'Focus is built on a 100% offline database model with zero data tracking. Your journals, daily moods, and configuration settings never leave your device.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <PrivacyClient />
}
