import React from 'react'
import PrivacyClient from './PrivacyClient'

export const metadata = {
  title: 'Privacy Policy — Focus App',
  description: 'Focus collects zero personal data. All journals, moods and settings are stored locally on your device. No cloud. No servers. Ever.',
  alternates: {
    canonical: 'https://getfocus.online/privacy',
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
    title: 'Privacy Policy — Focus App',
    description: 'Focus collects zero personal data. All journals, moods and settings are stored locally on your device. No cloud. No servers. Ever.',
    url: 'https://getfocus.online/privacy',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy — Focus App',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Focus App',
    description: 'Focus collects zero personal data. All journals, moods and settings are stored locally on your device. No cloud. No servers. Ever.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <PrivacyClient />
}
