import React from 'react'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About Focus — Built for Privacy, Not Profit',
  description: 'Learn why Focus was built — a privacy-first, offline-only Android app with zero tracking, calligraphy quotes and book-grade journaling.',
  alternates: {
    canonical: 'https://getfocus.online/about',
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
    title: 'About Focus — Built for Privacy, Not Profit',
    description: 'Learn why Focus was built — a privacy-first, offline-only Android app with zero tracking, calligraphy quotes and book-grade journaling.',
    url: 'https://getfocus.online/about',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Focus — Built for Privacy, Not Profit',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Focus — Built for Privacy, Not Profit',
    description: 'Learn why Focus was built — a privacy-first, offline-only Android app with zero tracking, calligraphy quotes and book-grade journaling.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <AboutClient />
}
