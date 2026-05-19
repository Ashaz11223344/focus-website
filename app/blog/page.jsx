import React from 'react'
import { getBlogArticles } from '../../lib/blog'
import BlogIndexClient from './BlogIndexClient'

export const metadata = {
  title: 'Focus App Blog – Mindfulness, Stoicism & Offline Productivity',
  description: 'Read insights and proven tips on mindfulness, local journaling habits, offline productivity, and scientific daily mood tracking.',
  keywords: ['productivity tips', 'mindfulness', 'offline apps', 'daily habits', 'stoic journaling'],
  alternates: {
    canonical: 'https://getfocus.online/blog',
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
