import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAllGuides } from '@/hooks/useGuideContent';
import GuideCard from '@/components/GuideCard/GuideCard';
import Sidebar from '@/components/Sidebar/Sidebar';
import AdBanner from '@/components/AdBanner/AdBanner';
import type { GuideMeta } from '@/types/guide';
import styles from './GuideList.module.css';

export default function GuideList() {
  const { t } = useTranslation(['common', 'guides']);
  const { guides, loading } = useAllGuides('zh'); // 默认显示中文攻略
  const [selectedCategory, ] = useState<string>('all');

  // 过滤攻略
  const filteredGuides = useMemo(() => {
    if (selectedCategory === 'all') return guides;
    return guides.filter((guide: GuideMeta) => guide.category === selectedCategory);
  }, [guides, selectedCategory]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t('allGuides', { ns: 'guides' })}</h1>
            <p className={styles.count}>
              {t('count', { count: filteredGuides.length, defaultValue: `${filteredGuides.length} 篇攻略` })}
            </p>
          </div>

          <AdBanner position="inline" />

          {loading ? (
            <div className={styles.loading}>{t('loading', { ns: 'common' })}</div>
          ) : filteredGuides.length > 0 ? (
            <div className={styles.guideGrid}>
              {filteredGuides.map((guide: GuideMeta) => (
                <GuideCard
                  key={guide.slug}
                  guide={{
                    slug: guide.slug,
                    title: guide.title,
                    description: guide.description,
                    coverImage: guide.coverImage,
                    date: guide.date,
                    tags: guide.tags,
                    category: guide.category,
                  }}
                  locale={guide.lang}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>{t('noContent', { ns: 'common' })}</div>
          )}

          <AdBanner position="footer" />
        </main>
      </div>
    </div>
  );
}
