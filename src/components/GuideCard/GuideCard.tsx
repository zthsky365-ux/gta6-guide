import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { GuideCardData } from '@/types/guide';
import { getLocalizedPath } from '@/utils/i18n';
import styles from './GuideCard.module.css';

interface GuideCardProps {
  guide: GuideCardData;
  locale?: 'zh' | 'en';
}

export default function GuideCard({ guide, locale = 'zh' }: GuideCardProps) {
  const { t } = useTranslation('common');

  const formattedDate = new Date(guide.date).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );

  return (
    <article className={styles.card}>
      {guide.coverImage && (
        <Link to={getLocalizedPath(`/guides/${guide.slug}`, locale)} className={styles.coverLink}>
          <img
            src={guide.coverImage}
            alt={guide.title}
            className={styles.coverImage}
          />
        </Link>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{guide.category}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>

        <h3 className={styles.title}>
          <Link to={getLocalizedPath(`/guides/${guide.slug}`, locale)} className={styles.titleLink}>
            {guide.title}
          </Link>
        </h3>

        <p className={styles.description}>{guide.description}</p>

        {guide.tags && guide.tags.length > 0 && (
          <div className={styles.tags}>
            {guide.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link to={getLocalizedPath(`/guides/${guide.slug}`, locale)} className={styles.readMore}>
          {t('readMore')} &rarr;
        </Link>
      </div>
    </article>
  );
}
