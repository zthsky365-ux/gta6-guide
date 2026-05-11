import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import AdBanner from '@/components/AdBanner/AdBanner';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { t } = useTranslation(['common', 'guides']);
  const location = useLocation();

  const categories = [
    { key: 'all', label: t('all', { ns: 'common' }), path: '/guides' },
    {
      key: 'missions',
      label: t('missionGuides', { ns: 'guides' }),
      path: '/guides?category=missions',
    },
    {
      key: 'tips',
      label: t('tipsGuides', { ns: 'guides' }),
      path: '/guides?category=tips',
    },
    {
      key: 'vehicles',
      label: t('vehicleGuides', { ns: 'guides' }),
      path: '/guides?category=vehicles',
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('guides', { ns: 'common' })}</h3>
        <nav className={styles.nav}>
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={cat.path}
              className={`${styles.navLink} ${
                location.search.includes(cat.key) || (cat.key === 'all' && location.pathname === '/guides' && !location.search)
                  ? styles.active
                  : ''
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.adSection}>
        <AdBanner position="sidebar" />
      </div>
    </aside>
  );
}
