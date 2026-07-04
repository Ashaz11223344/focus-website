import React from 'react'
import AboutMeClient from './AboutMeClient'

export const metadata = {
  title: 'Ashaz Pathan — Founder & Software Architect | Focus App',
  description: 'Step into the premium, 3D interactive workspace of Ashaz Pathan, the creator and software architect of Focus App. Focused on handcrafted, local-first private software.',
  alternates: {
    canonical: '/aboutme',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "US;GB;CA;AU;IN;DE",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "author": 'Ashaz Pathan',
    "language": 'English',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Ashaz',
    lastName: 'Pathan',
    username: 'ashazapps',
    gender: 'male',
    siteName: 'Focus App',
    title: 'Ashaz Pathan — Founder & Software Architect | Focus App',
    description: 'Step into the premium, 3D interactive workspace of Ashaz Pathan, the creator and software architect of Focus App. Focused on handcrafted, local-first private software.',
    url: 'https://getfocus.online/aboutme',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ashaz Pathan — Founder & Software Architect | Focus App',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashaz Pathan — Founder & Software Architect | Focus App',
    description: 'Step into the premium, 3D interactive workspace of Ashaz Pathan, the creator and software architect of Focus App. Focused on handcrafted, local-first private software.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <AboutMeClient />
}
