import React from 'react'
import DocClient from './DocClient'

export const metadata = {
  title: 'Focus App Documentation — User Guide & Offline Setup Help',
  description: 'Learn how to get started, track your mood, and write Stoic reflections locally using Focus. A comprehensive guide to offline diary features.',
  alternates: {
    canonical: '/documentation',
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
    title: 'Focus App Documentation — User Guide & Offline Setup Help',
    description: 'Learn how to get started, track your mood, and write Stoic reflections locally using Focus. A comprehensive guide to offline diary features.',
    url: 'https://getfocus.online/documentation',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App Documentation — User Guide & Offline Setup Help',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App Documentation — User Guide & Offline Setup Help',
    description: 'Learn how to get started, track your mood, and write Stoic reflections locally using Focus. A comprehensive guide to offline diary features.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://getfocus.online/documentation#webpage",
  "url": "https://getfocus.online/documentation",
  "name": "Focus App Documentation — User Guide & Offline Setup Help",
  "description": "Learn how to get started, track your mood, and write Stoic reflections locally using Focus. A comprehensive guide to offline diary features.",
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
      <DocClient />
    </>
  )
}
