import React from 'react'
import { getBlogArticles } from '../../lib/blog'
import BlogIndexClient from './BlogIndexClient'

export const metadata = {
  title: 'Focus Blog — Productivity, Mindfulness & Habits',
  description: 'Read articles on offline productivity, daily journaling, mood tracking and building mindful habits without screen addiction.',
  alternates: {
    canonical: 'https://getfocus.online/blog',
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
    title: 'Focus Blog — Productivity, Mindfulness & Habits',
    description: 'Read articles on offline productivity, daily journaling, mood tracking and building mindful habits without screen addiction.',
    url: 'https://getfocus.online/blog',
    images: [
      {
        url: 'https://getfocus.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Focus Blog — Productivity, Mindfulness & Habits',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Blog — Productivity, Mindfulness & Habits',
    description: 'Read articles on offline productivity, daily journaling, mood tracking and building mindful habits without screen addiction.',
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
