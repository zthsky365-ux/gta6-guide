import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { useGuideContent } from '@/hooks/useGuideContent';
import TableOfContents from '@/components/TableOfContents/TableOfContents';
import AdBanner from '@/components/AdBanner/AdBanner';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { getLocalizedPath } from '@/utils/i18n';
import type { GuideMeta } from '@/types/guide';
import styles from './GuideDetail.module.css';
import { useEffect } from 'react';
import { useAllGuides } from '@/hooks/useGuideContent';

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'zh' | 'en';
  const { guide, loading, error } = useGuideContent(slug!, currentLang);
  const { guides } = useAllGuides(currentLang);
  const { t } = useTranslation('common');

  // 查找上一篇和下一篇
  const currentIndex = guides.findIndex((g: GuideMeta) => g.slug === slug);
  const prevGuide = currentIndex > 0 ? guides[currentIndex - 1] : null;
  const nextGuide = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;

  useEffect(() => {
    if (guide) {
      document.title = `${guide.frontMatter.title} | GTA6 攻略`;
    }
  }, [guide]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>{t('loading')}</div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h1>攻略未找到</h1>
          <Link to="/guides" className={styles.backLink}>
            ← {t('guides', { ns: 'common' })}
          </Link>
        </div>
      </div>
    );
  }

  const { frontMatter, content, toc } = guide;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb />

        <div className={styles.layout}>
          <main className={styles.main}>
            <article className={styles.article}>
              <header className={styles.header}>
                <div className={styles.meta}>
                  <span className={styles.category}>{frontMatter.category}</span>
                  <span className={styles.date}>
                    {t('publishedDate')}: {new Date(frontMatter.date).toLocaleDateString()}
                  </span>
                  {frontMatter.updated && (
                    <span className={styles.updated}>
                      {t('updatedDate')}: {new Date(frontMatter.updated).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <h1 className={styles.title}>{frontMatter.title}</h1>

                {frontMatter.tags && frontMatter.tags.length > 0 && (
                  <div className={styles.tags}>
                    {frontMatter.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {frontMatter.coverImage && (
                <img
                  src={frontMatter.coverImage}
                  alt={frontMatter.title}
                  className={styles.coverImage}
                />
              )}

              <div className={styles.content}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm] as any}
                  rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings] as any}
                >
                  {content}
                </ReactMarkdown>
              </div>

              <AdBanner position="inline" />

              {(prevGuide || nextGuide) && (
                <nav className={styles.navigation}>
                  {prevGuide && (
                    <Link to={getLocalizedPath(`/guides/${prevGuide.slug}`, currentLang)} className={styles.navLink}>
                      <span className={styles.navLabel}>← {t('previous')}</span>
                      <span className={styles.navTitle}>{prevGuide.title}</span>
                    </Link>
                  )}

                  {nextGuide && (
                    <Link to={getLocalizedPath(`/guides/${nextGuide.slug}`, currentLang)} className={`${styles.navLink} ${styles.next}`}>
                      <span className={styles.navLabel}>{t('next')} →</span>
                      <span className={styles.navTitle}>{nextGuide.title}</span>
                    </Link>
                  )}
                </nav>
              )}
            </article>
          </main>

          <aside className={styles.sidebar}>
            <TableOfContents toc={toc} />
            <AdBanner position="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
