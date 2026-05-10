import { useAds } from '@/hooks/useAds';
import type { AdItem } from '@/types/ad';
import styles from './AdBanner.module.css';

interface AdBannerProps {
  position: string;
  className?: string;
}

export default function AdBanner({ position, className }: AdBannerProps) {
  const { ads, enabled, loading } = useAds(position);

  if (loading || !enabled || ads.length === 0) {
    return null;
  }

  // 暂时只渲染第一个广告
  const ad: AdItem = ads[0];

  return (
    <div className={`${styles.adContainer} ${className || ''}`}>
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={styles.adLink}
        aria-label={ad.title}
      >
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className={styles.adImage}
        />
      </a>
    </div>
  );
}
