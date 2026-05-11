import matter from 'gray-matter';
import type { Guide, GuideFrontMatter, TableOfContentsItem } from '@/types/guide';

/**
 * 从 Markdown 文本中解析 Front Matter 和内容
 */
export function parseMarkdown(rawContent: string): {
  frontMatter: GuideFrontMatter;
  content: string;
} {
  const { data, content } = matter(rawContent);

  return {
    frontMatter: data as GuideFrontMatter,
    content,
  };
}

/**
 * 从 Markdown 内容中提取标题生成目录结构
 * 使用正则表达式匹配 # 标题
 */
export function extractTableOfContents(markdownContent: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  const stack: TableOfContentsItem[] = [];

  let match;
  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`#]/g, '').trim();
    const id = generateSlug(text);

    const item: TableOfContentsItem = {
      id,
      text,
      level,
      children: [],
    };

    // 维护层级结构
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
    } else {
      stack[stack.length - 1].children = stack[stack.length - 1].children || [];
      stack[stack.length - 1].children!.push(item);
    }

    stack.push(item);
  }

  return toc;
}

/**
 * 生成标题的 slug（锚点 ID）
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/^-+|-+$/g, '');
}

/**
 * 使用 Vite 的 import.meta.glob 动态加载所有 Markdown 文件
 * 返回攻略元数据列表（不含完整内容，用于列表页）
 */
export async function loadAllGuidesMeta(): Promise<Guide['frontMatter'][]> {
  const modules = import.meta.glob('../../content/guides/**/*.md', {
    query: '?raw',
    import: 'default',
  });

  const metas: Guide['frontMatter'][] = [];

  for (const path in modules) {
    const rawContent = (await modules[path]()) as string;
    const { frontMatter } = parseMarkdown(rawContent);
    metas.push(frontMatter);
  }

  return metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 根据 slug 加载单个攻略的完整内容
 */
export async function loadGuideBySlug(slug: string, lang: 'zh' | 'en' = 'zh'): Promise<Guide | null> {
  try {
    // 尝试加载对应语言的 Markdown 文件
    const modules = import.meta.glob('../../content/guides/**/*.md', {
      query: '?raw',
      import: 'default',
    });

    for (const path in modules) {
      const rawContent = (await modules[path]()) as string;
      const { frontMatter, content } = parseMarkdown(rawContent);

      if (frontMatter.slug === slug && frontMatter.lang === lang) {
        const toc = extractTableOfContents(content);
        return {
          slug,
          frontMatter,
          content,
          toc,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to load guide:', error);
    return null;
  }
}
