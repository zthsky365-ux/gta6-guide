import { Article } from './types';
import { publishFile, deleteFile } from './github';
import matter from 'gray-matter';

/**
 * Convert an Article object to markdown with frontmatter
 */
export function articleToMarkdown(article: Article): string {
  const frontmatter = {
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    tags: article.tags,
    coverImage: article.coverImage,
    date: article.date,
    author: article.author,
    readTime: article.readTime,
    featured: article.featured || false,
  };

  return matter.stringify(article.content, frontmatter);
}

/**
 * Parse markdown with frontmatter to an Article object
 */
export function markdownToArticle(markdown: string, slug: string): Article {
  const { data, content } = matter(markdown);

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    content,
    category: data.category || 'news',
    tags: data.tags || [],
    coverImage: data.coverImage || '',
    date: data.date || new Date().toISOString().split('T')[0],
    author: data.author || '',
    readTime: data.readTime || 5,
    featured: data.featured || false,
  };
}

/**
 * Publish an article to GitHub
 */
export async function publishArticle(article: Article): Promise<{
  success: boolean;
  message: string;
  url?: string;
}> {
  const markdown = articleToMarkdown(article);
  const path = `content/articles/${article.category}/${article.slug}.md`;

  const result = await publishFile(
    path,
    markdown,
    `Publish article: ${article.title}`
  );

  return result;
}

/**
 * Delete an article from GitHub
 */
export async function deleteArticle(
  slug: string,
  category: string
): Promise<{
  success: boolean;
  message: string;
}> {
  const path = `content/articles/${category}/${slug}.md`;
  return deleteFile(path, `Delete article: ${slug}`);
}

/**
 * Publish site configuration
 */
export async function publishSiteConfig(config: Record<string, unknown>): Promise<{
  success: boolean;
  message: string;
}> {
  const content = JSON.stringify(config, null, 2);
  return publishFile('content/site-config.json', content, 'Update site configuration');
}

/**
 * Batch publish all articles
 */
export async function publishAllArticles(
  articles: Article[]
): Promise<{ success: boolean; message: string }[]> {
  const results = await Promise.all(
    articles.map(async (article) => {
      const result = await publishArticle(article);
      return result;
    })
  );
  return results;
}
