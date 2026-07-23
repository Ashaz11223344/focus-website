import { getBlogArticles } from '../lib/blog'

export default async function sitemap() {
  const baseUrl = 'https://getfocus.online'

  // Fetch dynamic blog routes
  const articles = getBlogArticles()
  const blogUrls = articles.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: new Date(art.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Define static routes
  const staticRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/features', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/pricing', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/documentation', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/download', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/aboutme', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/contact-support', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { url: '/blog', priority: 0.8, changeFrequency: 'daily' },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...staticRoutes, ...blogUrls]
}
