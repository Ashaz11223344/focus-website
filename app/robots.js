export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Applebot-Extended',
          'Google-Extended',
          'cohere-ai',
          'OMgili',
          'OMgilibot',
          'Meta-ExternalAgent',
          'facebookexternalhit'
        ],
        allow: '/',
      }
    ],
    sitemap: 'https://getfocus.online/sitemap.xml',
  }
}
