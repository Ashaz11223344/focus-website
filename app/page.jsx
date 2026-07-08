import React from 'react'
import HomeClient from './HomeClient'

export const metadata = {
  title: 'Focus App — Offline Mood Tracker & Stoic Journal | Android',
  description: 'Cultivate Stoic consistency in complete privacy. Focus App is a 100% offline mood tracker and Stoic journal for Android to log emotions and reflect daily.',
  keywords: [
    "Focus App",
    "Mindful Offline Growth",
    "No Account Self Improvement",
    "Zero Telemetry Mood Tracker",
    "Calligraphy Daily Quotes",
    "Book Style Aesthetic Journal",
    "Single Log Mood Tracker",
    "Offline Habit Badges",
    "Quiet Hours Quotes Reminder",
    "No Subscription Mood Tracker",
    "Offline Diary App Android",
    "Habit Streak Tracker Android",
    "Daylio Alternative Offline",
    "Ad Free Journaling App",
    "No Login Required Journal App",
    "Lightweight Productivity App Android",
    "Dark Mode Journaling App",
    "Gamified Self Improvement App",
    "Daily Reflection Journal App",
    "Private Mental Wellness App",
    // Geo targeted and long-tail focus keywords
    "privacy-first mood tracker USA",
    "Stoic journal app United Kingdom",
    "offline diary companion Canada",
    "mental health tracker Australia",
    "local-first mood journal India",
    "secure offline reflection Germany",
    "private self improvement app Europe",
    "Daylio alternative no account",
    "best offline Stoicism diary 2026"
  ],
  alternates: {
    canonical: '/',
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
    title: 'Focus App — Offline Mood Tracker & Stoic Journal | Android',
    description: 'Cultivate Stoic consistency in complete privacy. Focus App is a 100% offline mood tracker and Stoic journal for Android to log emotions and reflect daily.',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus App — Offline Mood Tracker & Stoic Journal',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus App — Offline Mood Tracker & Stoic Journal | Android',
    description: 'Cultivate Stoic consistency in complete privacy. Focus App is a 100% offline mood tracker and Stoic journal for Android to log emotions and reflect daily.',
    images: ['/og-image.png'],
  }
}

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://getfocus.online/#website",
    "url": "https://getfocus.online",
    "name": "Focus App",
    "description": "Privacy-First Offline Mood Tracker & Stoic Journal",
    "publisher": {
      "@id": "https://getfocus.online/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://getfocus.online/#organization",
    "name": "Focus App",
    "url": "https://getfocus.online",
    "logo": {
      "@type": "ImageObject",
      "url": "https://getfocus.online/favicon.png"
    },
    "sameAs": [
      "https://x.com/focus_app"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@getfocus.online",
      "contactType": "customer support"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://getfocus.online/#software",
    "name": "Focus App",
    "operatingSystem": "Android",
    "applicationCategory": "Mindfulness, MentalWellnessApplication, ProductivityApplication",
    "applicationSubCategory": "Mindful Offline Growth & Stoic Reflection",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Focus is a state-of-the-art, 100% offline and privacy-first personal growth companion app for Android. Track daily moods, write book-grade journals, and cycle calligraphy stoic quotes completely offline.",
    "url": "https://getfocus.online",
    "screenshot": "https://getfocus.online/og-image.png",
    "creator": {
      "@id": "https://getfocus.online/#organization"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "People interested in Stoicism, mindfulness, offline journaling, and data privacy"
    },
    "featureList": [
      "Offline Calligraphy Daily Quotes",
      "Zero Telemetry Mood Tracker",
      "Book Style Aesthetic Journal",
      "Silent Habit Streak Tracker",
      "Gamified Offline Milestones & Achievements",
      "Quiet Hours Quotes Notification Filters",
      "Zero Cloud Sync & No Account Requirements",
      "Sandboxed Local SQLite Database Security"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://getfocus.online/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://getfocus.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Focus App",
        "item": "https://getfocus.online"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://getfocus.online/#webpage",
    "url": "https://getfocus.online",
    "name": "Focus App — Offline Mood Tracker & Stoic Journal",
    "description": "Cultivate Stoic consistency in complete privacy. Focus App is a 100% offline mood tracker and Stoic journal for Android to log emotions and reflect daily.",
    "publisher": {
      "@id": "https://getfocus.online/#organization"
    },
    "author": {
      "@id": "https://getfocus.online/#organization"
    },
    "isPartOf": {
      "@id": "https://getfocus.online/#website"
    },
    "breadcrumb": {
      "@id": "https://getfocus.online/#breadcrumb"
    },
    "datePublished": "2026-01-01T00:00:00+00:00",
    "dateModified": "2026-07-08T14:42:17+05:30"
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://getfocus.online/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Focus App?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus App is an offline-first Android productivity and mental wellbeing application that combines daily mood tracking with structured Stoic journaling. It is designed to help users log their emotions, view beautiful calligraphic Stoic quotes, and build consistent habits in complete privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Does Focus App work without internet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Focus App is built to work 100% offline. It does not require any active internet connection, cellular data, or online sign-in. All databases, typography files, and features are fully self-contained on your device."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data private with Focus App?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your personal reflections, journal entries, and emotional logs are stored strictly inside a sandboxed local database on your Android device. Focus App collects zero telemetry, has no cloud servers, requires no user account, and does not share data with any third parties."
        }
      },
      {
        "@type": "Question",
        "name": "What is Stoic journaling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stoic journaling is a daily reflection practice based on Stoic philosophy, focusing on distinguishing between what you can control and what you cannot control. Focus App integrates this practice by presenting inspiring quotes and structured prompts to help you build emotional clarity and resilience."
        }
      },
      {
        "@type": "Question",
        "name": "Is Focus App free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Focus App is completely free to download and use on Android. There are no subscriptions, in-app purchases, or advertisements, providing a distraction-free environment for your mindfulness journey."
        }
      },
      {
        "@type": "Question",
        "name": "What Android versions does Focus App support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus App is optimized for modern Android versions, supporting devices running Android 8.0 (Oreo) and above. It is designed to be lightweight, preserving both storage space and battery life."
        }
      }
    ]
  }
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomeClient />
    </>
  )
}
