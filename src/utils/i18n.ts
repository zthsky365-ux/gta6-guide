/**
 * i18n 相关工具函数
 */

/**
 * 获取当前语言（从 URL 或 localStorage）
 */
export function getCurrentLang(): 'zh' | 'en' {
  if (typeof window === 'undefined') return 'zh';

  // 从 URL 路径检测语言
  const path = window.location.pathname;
  if (path.startsWith('/en/')) return 'en';

  // 从 localStorage 读取
  const saved = localStorage.getItem('i18nextLng');
  if (saved === 'en') return 'en';

  return 'zh';
}

/**
 * 根据当前语言获取本地化路径
 * @param path 原始路径
 * @param lang 目标语言
 */
export function getLocalizedPath(path: string, lang: 'zh' | 'en'): string {
  // 移除现有语言前缀
  let cleanPath = path.replace(/^\/(zh|en)\//, '/');

  // 如果是英文，添加 /en 前缀
  if (lang === 'en') {
    return `/en${cleanPath === '/' ? '' : cleanPath}`;
  }

  return cleanPath;
}

/**
 * 获取语言对应的显示名称
 */
export function getLangDisplayName(lang: 'zh' | 'en'): string {
  const names: Record<string, string> = {
    zh: '中文',
    en: 'EN',
  };
  return names[lang] || lang;
}
