import React from 'react'
import { getArticleBySlug, getBlogArticles } from '../../../lib/blog'
import BlogArticleClient from './BlogArticleClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) return {}

  const title = `${article.title} | Focus Blog`
  const description = article.excerpt || "Read articles on offline productivity, daily journaling, mood tracking and building mindful habits."
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://getfocus.online/blog/${slug}`,
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
      type: 'article',
      siteName: 'Focus App',
      title,
      description,
      url: `https://getfocus.online/blog/${slug}`,
      images: [
        {
          url: 'https://getfocus.online/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://getfocus.online/og-image.png'],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Focus App"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Focus App",
      "url": "https://getfocus.online"
    },
    "datePublished": article.date,
    "url": `https://getfocus.online/blog/${slug}`
  }
    
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
