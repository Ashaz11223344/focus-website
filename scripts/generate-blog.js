import fs from 'fs';
import path from 'path';

// Configurations
const TOPICS_FILE = path.join(process.cwd(), 'content', 'blog-topics.json');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral';

// Ensure the blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// 1. Load Next Unpublished Topic
const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf8'));
const nextTopicIndex = topics.findIndex(t => !t.published);

if (nextTopicIndex === -1) {
  console.log("🔔 No unpublished topics left in blog-topics.json! Pipeline halted.");
  process.exit(0);
}

const topic = topics[nextTopicIndex];
console.log(`📝 Selected Topic: "${topic.title}"`);

// 2. Build the System Prompt
const systemPrompt = `You are a premium copywriter for Focus Website, an offline-first writing, journaling, and mindfulness application. 
Your writing style is thoughtful, deep, stoic, grounded, and scientific—similar to articles on Medium's Better Humans or the writings of Marcus Aurelius. 
Avoid clunky AI marketing jargon (e.g., "delve", "tapestry", "in today's fast-paced world", "testament").

Write a comprehensive, engaging blog article based on:
Title: "${topic.title}"
Keywords: ${topic.keywords.join(', ')}
Category: "${topic.category}"

Generate a valid JSON object matching this schema exactly:
{
  "title": "Title of the blog post",
  "category": "Focus Tips or Mindset",
  "excerpt": "A compelling 1-2 sentence description of the article",
  "author": "Ashaz Pathan",
  "readTime": "X min read",
  "slug": "url-friendly-slug-here",
  "content": "The full blog body in standard Markdown. Use clean headings (## and ###), lists, blockquotes, and bold text. Avoid using custom JSX tags, as they could break the build."
}`;

// 3. Request Local Ollama API
async function generateArticle() {
  console.log(`🤖 Contacting local Ollama instance at ${OLLAMA_HOST} using model "${OLLAMA_MODEL}"...`);
  
  const endpoint = `${OLLAMA_HOST}/api/generate`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: systemPrompt,
      format: 'json',
      stream: false
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Ollama API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const rawJsonText = data.response;
  return JSON.parse(rawJsonText);
}

// 4. Validate and Clean MDX
function sanitizeContentForMDX(content) {
  // MDX is highly sensitive to isolated curly braces { and } or unclosed XML tags like <.
  // We must escape or replace unescaped braces and brackets that aren't valid JSX.
  let clean = content;
  
  // Escape loose curly braces that aren't variables
  clean = clean.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
  
  // Escape loose angle brackets that could be mistaken for unclosed JSX tags
  // Replace < with &lt; unless it looks like a markdown image/link, or is a code block
  clean = clean.replace(/<([a-zA-Z])/g, '&lt;$1');

  return clean;
}

async function main() {
  try {
    const articleData = await generateArticle();
    const cleanContent = sanitizeContentForMDX(articleData.content);
    
    // Assemble Frontmatter + MDX content
    const mdxFileContent = `---
title: "${articleData.title.replace(/"/g, '\\"')}"
category: "${articleData.category}"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "${articleData.excerpt.replace(/"/g, '\\"')}"
author: "${articleData.author}"
readTime: "${articleData.readTime}"
---

${cleanContent}
`;

    // Validate the generated slug and set default filename
    const slug = articleData.slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const filename = `${slug}.mdx`;
    const filePath = path.join(BLOG_DIR, filename);

    // 5. Write MDX File
    fs.writeFileSync(filePath, mdxFileContent, 'utf8');
    console.log(`✅ Successfully generated new blog post: ${filePath}`);

    // 6. Update Topics JSON to set Published to true
    topic.published = true;
    fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), 'utf8');
    console.log("✅ Updated blog-topics.json status.");

  } catch (error) {
    console.error("❌ Pipeline failed during generation:", error);
    process.exit(1);
  }
}

main();
