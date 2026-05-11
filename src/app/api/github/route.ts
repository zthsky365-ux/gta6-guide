import { NextResponse } from 'next/server';
import { articleToMarkdown } from '@/lib/content-manager';
import { sampleArticles } from '@/lib/data';

export async function GET() {
  // Return status of GitHub configuration
  const hasToken = !!process.env.GITHUB_TOKEN;
  const hasOwner = !!process.env.GITHUB_OWNER;
  const hasRepo = !!process.env.GITHUB_REPO;

  return NextResponse.json({
    configured: hasToken && hasOwner && hasRepo,
    config: {
      hasToken,
      hasOwner,
      hasRepo,
      owner: process.env.GITHUB_OWNER || '',
      repo: process.env.GITHUB_REPO || 'gta6-guide',
      branch: process.env.GITHUB_BRANCH || 'main',
    },
    stats: {
      totalArticles: sampleArticles.length,
      categories: {
        news: sampleArticles.filter((a) => a.category === 'news').length,
        guide: sampleArticles.filter((a) => a.category === 'guide').length,
        walkthrough: sampleArticles.filter((a) => a.category === 'walkthrough').length,
        tips: sampleArticles.filter((a) => a.category === 'tips').length,
        download: sampleArticles.filter((a) => a.category === 'download').length,
      },
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'preview') {
      // Preview what will be published
      const files = sampleArticles.map((article) => ({
        path: `content/articles/${article.category}/${article.slug}.md`,
        content: articleToMarkdown(article),
        message: `Publish: ${article.title}`,
      }));

      return NextResponse.json({
        success: true,
        totalFiles: files.length,
        files: files.map((f) => ({
          path: f.path,
          size: new Blob([f.content]).size,
          message: f.message,
        })),
      });
    }

    if (action === 'publish-all') {
      // This would trigger the actual GitHub publish
      // For now, return preview data
      const files = sampleArticles.map((article) => ({
        path: `content/articles/${article.category}/${article.slug}.md`,
        content: articleToMarkdown(article),
        message: `Publish: ${article.title}`,
      }));

      return NextResponse.json({
        success: true,
        message: 'Publish initiated. Use /api/publish endpoint to actually publish.',
        totalFiles: files.length,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}
