import React from 'react'
import AboutMeClient from './AboutMeClient'

export const metadata = {
  title: 'Ashaz Pathan — Architect Behind Focus',
  description: 'Step into the premium, 3D interactive workspace of Ashaz Pathan, the founder and software architect of Focus. Experience handcrafted, local-first software engineering.',
  alternates: {
    canonical: 'https://getfocus.online/aboutme',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    author: 'Ashaz Pathan',
    language: 'English',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Ashaz',
    lastName: 'Pathan',
    username: 'ashazapps',
    gender: 'male',
    siteName: 'Focus App',
    title: 'Ashaz Pathan — Architect Behind Focus',
    description: 'Step into the premium, 3D interactive workspace of Ashaz Pathan, the founder and software architect of Focus. Experience handcrafted, local-first software engineering.',
    url: 'https://getfocus.online/aboutme',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ashaz Pathan — Architect Behind Focus',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashaz Pathan — Architect Behind Focus',
    description: 'Step into the premium, 3D interactive workspace of Ashaz Pathan, the founder and software architect of Focus. Experience handcrafted, local-first software engineering.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function Page() {
  return <AboutMeClient />
}
