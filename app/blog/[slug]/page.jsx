import React from 'react'
import { getArticleBySlug, getBlogArticles } from '../../../lib/blog'
import BlogArticleClient from './BlogArticleClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) return {}
  
  return {
    title: `${article.title} – Focus Motivation App Sanctuary`,
    description: article.excerpt,
    alternates: {
      canonical: `https://getfocus.online/blog/${slug}`,
    }
  }
}

export async function generateStaticParams() {
  const articles = getBlogArticles()
  return articles.map(art => ({
    slug: art.slug
  }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }
  
  // Find related posts (exclude current, take 2)
  const allArticles = getBlogArticles()
  const related = allArticles
    .filter(art => art.slug !== slug)
    .slice(0, 2)
    .map(art => ({
      slug: art.slug,
      title: art.title,
      category: art.category,
      date: art.date,
      excerpt: art.excerpt,
      author: art.author,
      readTime: art.readTime
    }))
    
  return (
    <BlogArticleClient 
      article={{
        slug: article.slug,
        title: article.title,
        category: article.category,
        date: article.date,
        excerpt: article.excerpt,
        author: article.author,
        readTime: article.readTime,
        content: article.content
      }}
      relatedArticles={related}
    />
  )
}
