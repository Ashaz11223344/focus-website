import React from 'react'
import FaqClient from './FaqClient'

export const metadata = {
  title: 'Frequently Asked Questions — Focus App | Offline Mood Tracker & Stoic Journal',
  description: 'Got questions about Focus App? Find direct answers about privacy, pricing, features, Android compatibility, and why offline Stoic reflection is the best choice for you.',
  alternates: {
    canonical: '/faq',
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
    title: 'Frequently Asked Questions — Focus App | Offline Mood Tracker & Stoic Journal',
    description: 'Got questions about Focus App? Find direct answers about privacy, pricing, features, Android compatibility, and why offline Stoic reflection is the best choice for you.',
    url: 'https://getfocus.online/faq',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions — Focus App',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions — Focus App | Offline Mood Tracker & Stoic Journal',
    description: 'Got questions about Focus App? Find direct answers about privacy, pricing, features, Android compatibility, and why offline Stoic reflection is the best choice for you.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://getfocus.online/faq#webpage",
    "url": "https://getfocus.online/faq",
    "name": "Frequently Asked Questions — Focus App",
    "description": "Got questions about Focus App? Find direct answers about privacy, pricing, features, Android compatibility, and why offline Stoic reflection is the best choice for you.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://getfocus.online/#website",
      "url": "https://getfocus.online"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://getfocus.online/faq#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Focus App?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus App is a premium, 100% offline personal growth companion for Android. It combines a zero-telemetry daily mood tracker with a structured Stoic journal and beautifully typeset daily calligraphy quotes. It is built to help you cultivate mindfulness and consistency in complete privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Is Focus App free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus App requires a small, one-time purchase of 20 Rupees (₹20) to support independent development. There are no monthly subscriptions, no ads, and no in-app purchases. All databases and features are fully self-contained on your device."
        }
      },
      {
        "@type": "Question",
        "name": "Which is the best focus app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you value privacy, simplicity, and aesthetics, Focus App is the best choice. Unlike other productivity apps that require cloud sign-ins and upload your private thoughts, Focus operates 100% offline and keeps all your data sandboxed locally in a secure SQLite database."
        }
      },
      {
        "@type": "Question",
        "name": "How to use Focus App?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus App fits seamlessly into your daily routine: Log your mood once a day, reflect on a Stoic journaling prompt, view inspiring calligraphic daily quotes, and build habits with offline streak badges."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use Focus App on iPhone or iOS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, Focus App is currently exclusive to Android. To ensure complete privacy, local-first performance, and secure sandboxing, the app is engineered specifically on top of Android's native SQLite room database."
        }
      },
      {
        "@type": "Question",
        "name": "Which is the best quotes app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus App stands out as a premium quotes app by combining daily wisdom cards with interactive reflection. Instead of random quotes, it cycles through curated calligraphic cards of Stoic thinkers (Marcus Aurelius, Seneca, Epictetus) to help you build daily resilience."
        }
      },
      {
        "@type": "Question",
        "name": "What is daily focus and how does the app help?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Daily focus is the practice of setting a single, mindful priority for your day. Focus App facilitates this by providing quiet daily journaling prompts that encourage you to reflect on what is within your control, with zero social media distraction."
        }
      },
      {
        "@type": "Question",
        "name": "Is Focus App worth it compared to other motivation apps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Most free motivation apps monetize your mental health data and push intrusive notifications. Focus App offers a completely clean, zero-telemetry environment. For a tiny one-time cost of ₹20, you get a lifetime of distraction-free mindfulness."
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
      <FaqClient />
    </>
  )
}
