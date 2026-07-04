import React from 'react'
import { getBlogArticles } from '../../lib/blog'
import BlogIndexClient from './BlogIndexClient'

export const metadata = {
  title: 'Focus Blog — Stoic Philosophy, Offline Productivity & Habits',
  description: 'Explore articles on Stoic philosophy, offline productivity, mindful calligraphy journaling, and zero-telemetry daily mood tracking patterns.',
  alternates: {
    canonical: '/blog',
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
    title: 'Focus Blog — Stoic Philosophy, Offline Productivity & Habits',
    description: 'Explore articles on Stoic philosophy, offline productivity, mindful calligraphy journaling, and zero-telemetry daily mood tracking patterns.',
    url: 'https://getfocus.online/blog',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus Blog — Stoic Philosophy, Offline Productivity & Habits',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Blog — Stoic Philosophy, Offline Productivity & Habits',
    description: 'Explore articles on Stoic philosophy, offline productivity, mindful calligraphy journaling, and zero-telemetry daily mood tracking patterns.',
    images: ['https://getfocus.online/og-image.png'],
  }
}

export default function BlogPage() {
  const articles = getBlogArticles()
  
  // Format articles to match initial props safely
  const formattedArticles = articles.map(art => ({
    slug: art.slug,
    title: art.title,
    category: art.category,
    date: art.date,
    excerpt: art.excerpt,
    author: art.author,
    readTime: art.readTime
  }))

  return <BlogIndexClient initialArticles={formattedArticles} />
}
