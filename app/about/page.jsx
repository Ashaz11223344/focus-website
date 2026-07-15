import React from 'react'
import AboutClient from './AboutClient'

export const metadata = {
  title: 'About Focus — Privacy-First Offline Stoic Journal & Diary',
  description: 'Discover the philosophy behind Focus. A privacy-first, 100% offline self improvement app built for Stoic reflection, journaling, and mood tracking with zero data logging.',
  alternates: {
    canonical: '/about',
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
    title: 'About Focus — Privacy-First Offline Stoic Journal & Diary',
    description: 'Discover the philosophy behind Focus. A privacy-first, 100% offline self improvement app built for Stoic reflection, journaling, and mood tracking with zero data logging.',
    url: 'https://getfocus.online/about',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About Focus — Privacy-First Offline Stoic Journal & Diary',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Focus — Privacy-First Offline Stoic Journal & Diary',
    description: 'Discover the philosophy behind Focus. A privacy-first, 100% offline self improvement app built for Stoic reflection, journaling, and mood tracking with zero data logging.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://getfocus.online/about#webpage",
  "url": "https://getfocus.online/about",
  "name": "About Focus — Privacy-First Offline Stoic Journal & Diary",
  "description": "Discover the philosophy behind Focus. A privacy-first, 100% offline self improvement app built for Stoic reflection, journaling, and mood tracking with zero data logging.",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://getfocus.online/#website",
    "url": "https://getfocus.online"
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutClient />
    </>
  )
}
