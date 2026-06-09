import React from 'react'
import TestingClient from './TestingClient'

export const metadata = {
  title: 'Focus App — Beta Tester Guide',
  description: 'Official testing guidelines and feedback submission instructions for Focus beta testers.',
  alternates: {
    canonical: 'https://getfocus.online/testing',
  },
  robots: {
    index: false,
    follow: false,
  },
  other: {
    author: 'Focus App',
    language: 'English',
  },
  openGraph: {
    type: 'website',
    siteName: 'Focus App',
    title: 'Focus App — Beta Tester Guide',
    description: 'Official testing guidelines and feedback submission instructions for Focus beta testers.',
    url: 'https://getfocus.online/testing',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App — Beta Tester Guide',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App — Beta Tester Guide',
    description: 'Official testing guidelines and feedback submission instructions for Focus beta testers.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <TestingClient />
}
