import { NextResponse } from 'next/server';
import { sampleArticles } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    articles: sampleArticles,
    total: sampleArticles.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, article, slug, category } = body;

    switch (action) {
      case 'create':
        // In a real app, save to database/file system
        return NextResponse.json({
          success: true,
          message: 'Article created successfully',
          article: article,
        });

      case 'update':
        return NextResponse.json({
          success: true,
          message: 'Article updated successfully',
          article: article,
        });

      case 'delete':
        return NextResponse.json({
          success: true,
          message: `Article ${slug} deleted successfully`,
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
