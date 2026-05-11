import { NextResponse } from 'next/server';
import { publishFile, triggerPagesBuild } from '@/lib/github';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { files, triggerBuild } = body;

    if (!files || !Array.isArray(files)) {
      return NextResponse.json(
        { success: false, message: 'Files array is required' },
        { status: 400 }
      );
    }

    const results = [];

    for (const file of files) {
      const result = await publishFile(file.path, file.content, file.message);
      results.push({ path: file.path, ...result });
    }

    // Optionally trigger GitHub Pages build
    if (triggerBuild) {
      const buildResult = await triggerPagesBuild();
      results.push({ path: 'pages-build', ...buildResult });
    }

    const allSuccess = results.every((r) => r.success);

    return NextResponse.json({
      success: allSuccess,
      message: allSuccess ? 'All files published successfully' : 'Some files failed to publish',
      results,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: `Publish failed: ${errMsg}` },
      { status: 500 }
    );
  }
}
