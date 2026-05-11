import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export default function Breadcrumb() {
  const { t } = useTranslation('common');
  const location = useLocation();

  const crumbs: BreadcrumbItem[] = generateBreadcrumbs(location.pathname, t);

  if (crumbs.length <= 1) return null;

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className={styles.item}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {index === crumbs.length - 1 ? (
              <span className={styles.current}>{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className={styles.link}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(
  pathname: string,
  t: (key: string) => string
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: t('home'), path: '/' }];

  if (pathname.startsWith('/guides/')) {
    crumbs.push({ label: t('guides'), path: '/guides' });
    // 可以从路径中提取 slug 并转换为标题
    const slug = pathname.split('/guides/')[1];
    if (slug) {
      crumbs.push({
        label: slug.replace(/-/g, ' ').toUpperCase(),
        path: pathname,
      });
    }
  } else if (pathname === '/guides') {
    crumbs.push({ label: t('guides'), path: '/guides' });
  } else if (pathname === '/about') {
    crumbs.push({ label: t('about'), path: '/about' });
  }

  return crumbs;
}
