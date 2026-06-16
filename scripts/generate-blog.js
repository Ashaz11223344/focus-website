import fs from 'fs';
import path from 'path';

// Configurations
const TOPICS_FILE = path.join(process.cwd(), 'content', 'blog-topics.json');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

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
const generatedSlug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const systemPrompt = `You are a premium copywriter for Focus Website, an offline-first writing, journaling, and mindfulness application. 
Your writing style is thoughtful, deep, stoic, grounded, and scientific—similar to articles on Medium's Better Humans or the writings of Marcus Aurelius. 
Avoid clunky AI marketing jargon (e.g., "delve", "tapestry", "in today's fast-paced world", "testament").

Write a comprehensive, engaging blog article based on:
Title: "${topic.title}"
Keywords: ${topic.keywords.join(', ')}
Category: "${topic.category}"

CRITICAL LENGTH AND STRUCTURE CONSTRAINTS:
The generated article body MUST meet these strict metrics:
- WORD COUNT: Must be between 900 and 1,200 words. (Do not write less than 860 words; do not write more than 1,230 words).
- CHARACTER COUNT: Must be between 5,500 and 7,800 characters (including spaces).
- DEPTH: Provide a thorough introduction, 4 to 5 well-developed main sections with ## headings, precise sub-sections with ### headings where appropriate, detailed blockquotes or bulleted tips, and a thoughtful, grounded conclusion. Write complete, detailed paragraphs rather than short, summarized sentences to meet the length requirement naturally.

YOUR OUTPUT MUST START WITH A FRONTMATTER BLOCK EXACTLY LIKE THIS:
---
title: "${topic.title}"
category: "${topic.category}"
excerpt: "A compelling 1-2 sentence description of the article"
author: "Ashaz Pathan"
readTime: "9 min read"
slug: "${generatedSlug}"
---

Followed immediately by your article markdown content starting with a ## heading. Do NOT include a # H1 title in the body (the H1 is rendered automatically by Next.js from the frontmatter).`;

// 3. Request Local Ollama API (Without JSON format restriction to allow raw Markdown)
async function generateArticle() {
  console.log(`🤖 Contacting local Ollama instance at ${OLLAMA_HOST} using model "${OLLAMA_MODEL}"...`);
  
  const endpoint = `${OLLAMA_HOST}/api/generate`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: systemPrompt,
      stream: false,
      options: {
        num_predict: 3000,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Ollama API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.response;
}

// 4. Parse and Extract Frontmatter and Markdown Content
function parseResponse(rawText) {
  const text = rawText.replace(/\r\n/g, '\n').trim();

  // Initialize metadata with default values
  const metadata = {
    title: topic.title,
    category: topic.category,
    excerpt: "",
    author: "Ashaz Pathan",
    readTime: "9 min read",
    slug: generatedSlug
  };

  let content = text;
  let frontmatterText = "";

  // Split by lines to find headings or tags
  const lines = text.split('\n');
  const headingIndex = lines.findIndex(line => line.trim().startsWith('## '));

  if (headingIndex !== -1) {
    // If a ## heading is found, we split by that heading.
    // Everything before the first ## heading is metadata/frontmatter.
    frontmatterText = lines.slice(0, headingIndex).join('\n');
    content = lines.slice(headingIndex).join('\n');
  } else {
    // Fallback: If no ## heading is found, search for frontmatter boundaries (---)
    const firstIndex = text.indexOf('---');
    if (firstIndex !== -1) {
      const secondIndex = text.indexOf('---', firstIndex + 3);
      if (secondIndex !== -1) {
        frontmatterText = text.slice(firstIndex + 3, secondIndex);
        content = text.slice(secondIndex + 3);
      } else {
        // Only one --- exists, maybe it was at the start. Let's try to treat everything after it as content.
        frontmatterText = text.slice(0, firstIndex);
        content = text.slice(firstIndex + 3);
      }
    } else {
      console.warn("⚠️ Warning: Could not find standard frontmatter delimiters (---) or ## headings in the response. Using defaults.");
    }
  }

  // Parse keys and values from frontmatter text if we managed to isolate any
  if (frontmatterText) {
    // Clean up code blocks (```yaml or ```) and delimiter markers
    const cleanFrontmatter = frontmatterText
      .replace(/```[a-z]*/gi, '')
      .replace(/---/g, '')
      .trim();

    cleanFrontmatter.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim().toLowerCase();
        let value = line.slice(colonIndex + 1).trim();
        
        // Strip outer double or single quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        if (key === 'title') metadata.title = value;
        else if (key === 'category') metadata.category = value;
        else if (key === 'excerpt') metadata.excerpt = value;
        else if (key === 'author') metadata.author = value;
        else if (key === 'readtime') metadata.readTime = value;
        else if (key === 'slug') metadata.slug = value;
      }
    });
  }

  // If content is empty or only whitespace after parsing, default to the whole raw text
  if (!content.trim()) {
    content = text;
  }

  // If excerpt is still empty, let's generate a quick one from the body
  if (!metadata.excerpt) {
    // Take the first few words of the content as an excerpt, stripping Markdown headings/formatting
    const plainText = content
      .replace(/[#*`>_\-]/g, '') // remove markdown symbols
      .replace(/\s+/g, ' ')      // collapse spaces
      .trim();
    metadata.excerpt = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
  }

  return { metadata, content };
}

// 5. Validate and Clean MDX
function sanitizeContentForMDX(content) {
  // MDX is highly sensitive to isolated curly braces { and } or unclosed XML tags like <.
  // We must escape or replace unescaped braces and brackets that aren't valid JSX.
  let clean = content;
  
  // Escape loose curly braces that aren't variables
  clean = clean.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
  
  // Escape loose angle brackets that could be mistaken for unclosed JSX tags
  clean = clean.replace(/<([a-zA-Z])/g, '&lt;$1');

  return clean;
}

async function main() {
  try {
    const rawText = await generateArticle();
    const { metadata, content } = parseResponse(rawText);
    const cleanContent = sanitizeContentForMDX(content);
    
    // Assemble Frontmatter + MDX content
    const mdxFileContent = `---
title: "${metadata.title.replace(/"/g, '\\"')}"
category: "${metadata.category}"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "${metadata.excerpt.replace(/"/g, '\\"')}"
author: "${metadata.author}"
readTime: "${metadata.readTime}"
---

${cleanContent}
`;

    // Validate the generated slug and set default filename
    const finalSlug = metadata.slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const filename = `${finalSlug}.mdx`;
    const filePath = path.join(BLOG_DIR, filename);

    // 6. Write MDX File
    fs.writeFileSync(filePath, mdxFileContent, 'utf8');
    console.log(`✅ Successfully generated new blog post: ${filePath}`);

    // 7. Update Topics JSON to set Published to true
    topic.published = true;
    fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), 'utf8');
    console.log("✅ Updated blog-topics.json status.");

  } catch (error) {
    console.error("❌ Pipeline failed during generation:", error);
    process.exit(1);
  }
}

main();
