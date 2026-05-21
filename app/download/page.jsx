import React from 'react'
import DownloadClient from './DownloadClient'

export const metadata = {
  title: 'Request Focus App — Early Access for Android',
  description: 'Request early access to Focus, the 100% offline personal growth app for Android. No Play Store. Direct APK delivery to your email.',
  alternates: {
    canonical: 'https://getfocus.online/download',
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
    title: 'Request Focus App — Early Access for Android',
    description: 'Request early access to Focus, the 100% offline personal growth app for Android. No Play Store. Direct APK delivery to your email.',
    url: 'https://getfocus.online/download',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Request Focus App — Early Access for Android',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request Focus App — Early Access for Android',
    description: 'Request early access to Focus, the 100% offline personal growth app for Android. No Play Store. Direct APK delivery to your email.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <DownloadClient />
}
