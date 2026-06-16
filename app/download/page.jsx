import React from 'react'
import DownloadClient from './DownloadClient'

export const metadata = {
  title: 'Join the Focus App Waiting List — Offline Android Companion',
  description: 'Join the waiting list for Focus, the 100% offline personal growth app for Android. Secure your private APK build delivered directly to your email.',
  alternates: {
    canonical: 'https://getfocus.online/download',
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
    title: 'Join the Focus App Waiting List — Offline Android Companion',
    description: 'Join the waiting list for Focus, the 100% offline personal growth app for Android. Secure your private APK build delivered directly to your email.',
    url: 'https://getfocus.online/download',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Join the Focus App Waiting List — Offline Android Companion',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Focus App Waiting List — Offline Android Companion',
    description: 'Join the waiting list for Focus, the 100% offline personal growth app for Android. Secure your private APK build delivered directly to your email.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <DownloadClient />
}
