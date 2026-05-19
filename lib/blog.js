import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getBlogArticles() {
  if (!fs.existsSync(BLOG_DIR)) return []
  
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
  
  const articles = files.map(file => {
    const filePath = path.join(BLOG_DIR, file)
    const contentStr = fs.readFileSync(filePath, 'utf-8')
    const slug = file.replace(/\.mdx$/, '').replace(/\.md$/, '')
    
    // Parse frontmatter
    const match = contentStr.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/)
    let metadata = {}
    let content = contentStr
    
    if (match) {
      const frontmatter = match[1]
      content = match[2]
      
      frontmatter.split('\n').forEach(line => {
        const parts = line.split(':')
        if (parts.length >= 2) {
          const key = parts[0].trim()
          let value = parts.slice(1).join(':').trim()
          // Strip surrounding quotes
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1)
          }
          metadata[key] = value
        }
      })
    }
    
    return {
      slug,
      title: metadata.title || 'Untitled Post',
      category: metadata.category || 'App Updates',
      date: metadata.date || new Date().toISOString().split('T')[0],
      excerpt: metadata.excerpt || '',
      author: metadata.author || 'Ashaz Pathan',
      readTime: metadata.readTime || '3 min read',
      content
    }
  })
  
  // Sort articles by date descending
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticleBySlug(slug) {
  const articles = getBlogArticles()
  return articles.find(art => art.slug === slug) || null
}
