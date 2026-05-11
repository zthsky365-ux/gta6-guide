/** 网站全局配置 */
export interface SiteConfig {
  title: string;           // 网站标题
  description: string;     // 网站描述
  author: string;          // 作者/组织
  url: string;             // 生产环境 URL
  repoUrl: string;         // GitHub 仓库地址
  i18n: {
    defaultLang: 'zh' | 'en';
    supportedLangs: string[];
  };
}
