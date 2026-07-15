import React from 'react'
import ContactClient from './ContactClient'

export const metadata = {
  title: 'Focus App Support — Contact Us & Feedback Channels',
  description: 'Need help or want to provide feedback on Focus App? Use our support channels or submit a form directly. We are offline-first and private.',
  alternates: {
    canonical: '/contact-support',
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
    title: 'Focus App Support — Contact Us & Feedback Channels',
    description: 'Need help or want to provide feedback on Focus App? Use our support channels or submit a form directly. We are offline-first and private.',
    url: 'https://getfocus.online/contact-support',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App Support — Contact Us & Feedback Channels',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App Support — Contact Us & Feedback Channels',
    description: 'Need help or want to provide feedback on Focus App? Use our support channels or submit a form directly. We are offline-first and private.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://getfocus.online/contact-support#webpage",
  "url": "https://getfocus.online/contact-support",
  "name": "Focus App Support — Contact Us & Feedback Channels",
  "description": "Need help or want to provide feedback on Focus App? Use our support channels or submit a form directly. We are offline-first and private.",
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
      <ContactClient />
    </>
  )
}
