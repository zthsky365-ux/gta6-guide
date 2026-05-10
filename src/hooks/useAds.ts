import { useState, useEffect } from 'react';
import type { AdItem, AdConfig } from '@/types/ad';
import adsConfig from '@/config/ads.json';

/**
 * 管理广告位显示的 Hook
 */
export function useAds(position?: string) {
  const [ads, setAds] = useState<AdItem[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const config = adsConfig as AdConfig;
      setEnabled(config.enabled);

      // 根据位置过滤广告
      let filteredAds = config.ads.filter((ad: AdItem) => ad.enabled);

      if (position) {
        filteredAds = filteredAds.filter((ad: AdItem) => ad.position === position);
      }

      // 检查广告投放时间
      const now = new Date();
      filteredAds = filteredAds.filter((ad: AdItem) => {
        if (ad.startDate && new Date(ad.startDate) > now) return false;
        if (ad.endDate && new Date(ad.endDate) < now) return false;
        return true;
      });

      setAds(filteredAds);
    } catch (error) {
      console.error('Failed to load ads:', error);
      setAds([]);
    }
  }, [position]);

  return {
    ads,
    enabled,
    loading: false,
  };
}

/**
 * 获取单个广告（用于特定位置）
 */
export function useAdByPosition(position: string): {
  ad: AdItem | null;
  enabled: boolean;
  loading: boolean;
} {
  const { ads, enabled, loading } = useAds(position);
  return {
    ad: ads.length > 0 ? ads[0] : null,
    enabled,
    loading,
  };
}
