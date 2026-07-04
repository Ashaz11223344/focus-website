import React from 'react'
import DownloadClient from './DownloadClient'

export const metadata = {
  title: 'Download Focus App — Offline Android Companion',
  description: 'Download Focus, the 100% offline personal growth app for Android. Access your private offline Stoic journaling and mood tracker.',
  alternates: {
    canonical: '/download',
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
    title: 'Download Focus App — Offline Android Companion',
    description: 'Download Focus, the 100% offline personal growth app for Android. Access your private offline Stoic journaling and mood tracker.',
    url: 'https://getfocus.online/download',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Download Focus App — Offline Android Companion',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Focus App — Offline Android Companion',
    description: 'Download Focus, the 100% offline personal growth app for Android. Access your private offline Stoic journaling and mood tracker.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <DownloadClient />
}
