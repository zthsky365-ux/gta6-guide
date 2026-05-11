/** Markdown Front Matter 元数据 */
export interface GuideFrontMatter {
  title: string;           // 攻略标题
  description: string;     // SEO 描述
  date: string;            // 发布日期 (YYYY-MM-DD)
  updated?: string;        // 更新日期
  tags: string[];         // 标签数组
  category: string;        // 分类（missions/tips/vehicles 等）
  coverImage?: string;     // 封面图路径
  author?: string;         // 作者
  lang: 'zh' | 'en';      // 语言版本
  slug: string;            // URL slug（文件名或自定义）
}

/** 攻略完整数据结构 */
export interface Guide {
  slug: string;
  frontMatter: GuideFrontMatter;
  content: string;         // Markdown 正文
  toc: TableOfContentsItem[];  // 目录结构
}

/** 目录项 */
export interface TableOfContentsItem {
  id: string;              // 锚点 ID
  text: string;            // 标题文本
  level: number;           // 标题级别 (1-6)
  children?: TableOfContentsItem[];  // 子标题（嵌套）
}

/** 攻略卡片（列表展示用） */
export interface GuideCardData {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  date: string;
  tags: string[];
  category: string;
}

/** 攻略元数据（用于列表展示，不含完整内容） */
export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  category: string;
  coverImage?: string;
  author?: string;
  lang: 'zh' | 'en';
}
