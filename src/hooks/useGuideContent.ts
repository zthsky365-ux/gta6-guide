import { useState, useEffect, useCallback } from 'react';
import type { Guide, GuideMeta } from '@/types/guide';
import { loadAllGuidesMeta, loadGuideBySlug } from '@/utils/markdown';

/**
 * 加载单个攻略内容的 Hook
 */
export function useGuideContent(slug: string, lang: 'zh' | 'en' = 'zh') {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadGuide = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadGuideBySlug(slug, lang);
      setGuide(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug, lang]);

  useEffect(() => {
    if (slug) {
      loadGuide();
    }
  }, [slug, lang, loadGuide]);

  return { guide, loading, error, reload: loadGuide };
}

/**
 * 加载所有攻略元数据的 Hook（用于列表页）
 */
export function useAllGuides(lang?: 'zh' | 'en') {
  const [guides, setGuides] = useState<GuideMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadGuides = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const metas = await loadAllGuidesMeta();

      // 如果指定了语言，进行过滤
      const filtered = lang
        ? metas.filter((meta) => meta.lang === lang)
        : metas;

      setGuides(filtered as GuideMeta[]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadGuides();
  }, [loadGuides]);

  return { guides, loading, error, reload: loadGuides };
}
