import { useTranslation } from 'react-i18next';
import { useAllGuides } from '@/hooks/useGuideContent';
import Hero from '@/components/Hero/Hero';
import GuideCard from '@/components/GuideCard/GuideCard';
import AdBanner from '@/components/AdBanner/AdBanner';
import type { GuideMeta } from '@/types/guide';
import styles from './Home.module.css';

export default function Home() {
  const { t } = useTranslation(['common', 'guides']);
  const { guides, loading } = useAllGuides('zh'); // 默认显示中文攻略

  const featuredGuides: GuideMeta[] = guides.slice(0, 3);
  const latestGuides: GuideMeta[] = guides.slice(3, 9);

  return (
    <div className={styles.home}>
      <Hero />

      <AdBanner position="hero" />

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('featuredGuides', { ns: 'guides' })}</h2>

          {loading ? (
            <div className={styles.loading}>{t('loading', { ns: 'common' })}</div>
          ) : featuredGuides.length > 0 ? (
            <div className={styles.guideGrid}>
              {featuredGuides.map((guide: GuideMeta) => (
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
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('latestGuides', { ns: 'guides' })}</h2>

          {latestGuides.length > 0 && (
            <div className={styles.guideGrid}>
              {latestGuides.map((guide: GuideMeta) => (
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
          )}
        </div>
      </section>
    </div>
  );
}
