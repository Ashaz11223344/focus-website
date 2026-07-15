import React from 'react'
import PricingClient from './PricingClient'

export const metadata = {
  title: 'Focus App Pricing — Affordable Premium Offline Stoic Journal',
  description: 'Understand Focus App\'s simple ₹20 one-time pricing for premium, offline-first mental wellness. No subscriptions, no ads, no trackers, and no hidden costs.',
  alternates: {
    canonical: '/pricing',
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
    title: 'Focus App Pricing — Affordable Premium Offline Stoic Journal',
    description: 'Understand Focus App\'s simple ₹20 one-time pricing for premium, offline-first mental wellness. No subscriptions, no ads, no trackers, and no hidden costs.',
    url: 'https://getfocus.online/pricing',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App Pricing — Affordable Premium Offline Stoic Journal',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App Pricing — Affordable Premium Offline Stoic Journal',
    description: 'Understand Focus App\'s simple ₹20 one-time pricing for premium, offline-first mental wellness. No subscriptions, no ads, no trackers, and no hidden costs.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://getfocus.online/pricing#webpage",
  "url": "https://getfocus.online/pricing",
  "name": "Focus App Pricing — Affordable Premium Offline Stoic Journal",
  "description": "Understand Focus App's simple ₹20 one-time pricing for premium, offline-first mental wellness. No subscriptions, no ads, no trackers, and no hidden costs.",
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
      <PricingClient />
    </>
  )
}
