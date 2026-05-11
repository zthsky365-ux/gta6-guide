/** 广告位配置 */
export interface AdConfig {
  ads: AdItem[];
  enabled: boolean;       // 全局广告开关
}

/** 单个广告项 */
export interface AdItem {
  id: string;              // 广告唯一标识
  position: AdPosition;    // 广告位置
  type: 'banner' | 'sidebar' | 'inline';  // 广告类型
  title: string;           // 广告标题（用于 alt 文本）
  imageUrl: string;        // 广告图片 URL
  linkUrl: string;         // 点击跳转链接
  startDate?: string;      // 投放开始日期
  endDate?: string;        // 投放结束日期
  enabled: boolean;        // 是否启用
}

/** 广告位置枚举 */
export type AdPosition =
  | 'hero'                 // Hero 区域下方
  | 'sidebar'              // 侧边栏
  | 'inline'               // 文章内文
  | 'footer';              // 页脚上方
