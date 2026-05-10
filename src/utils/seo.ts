import type { GuideFrontMatter } from '@/types/guide';

/**
 * SEO 相关工具函数
 */

export interface SeoData {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
}

/**
 * 从攻略 Front Matter 生成 SEO 数据
 */
export function generateSeoFromGuide(
  frontMatter: GuideFrontMatter,
  baseUrl: string = 'https://yourusername.github.io/gta6-guide'
): SeoData {
  return {
    title: `${frontMatter.title} | GTA6 攻略`,
    description: frontMatter.description,
    url: `${baseUrl}/guides/${frontMatter.slug}`,
    image: frontMatter.coverImage
      ? `${baseUrl}${frontMatter.coverImage}`
      : undefined,
    type: 'article',
  };
}

/**
 * 生成网站全局 SEO 数据
 */
export function generateSiteSeo(
  pageTitle: string,
  description: string = 'GTA6 游戏攻略网站，提供完整的游戏攻略、任务流程、技巧提示等内容。',
  baseUrl: string = 'https://yourusername.github.io/gta6-guide'
): SeoData {
  return {
    title: `${pageTitle} | GTA6 攻略`,
    description,
    url: baseUrl,
    type: 'website',
  };
}

/**
 * 格式化日期为 SEO 友好的格式
 */
export function formatDateForSEO(dateStr: string): string {
  return new Date(dateStr).toISOString();
}
