import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

interface HeaderProps {
  currentLang: 'zh' | 'en';
  onLanguageChange: (lang: 'zh' | 'en') => void;
}

export default function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const { t } = useTranslation(['navigation', 'common']);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>GTA6</span>
          <span className={styles.logoSubtext}>{t('guides', { ns: 'common' })}</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            {t('home', { ns: 'navigation' })}
          </Link>
          <Link
            to="/guides"
            className={`${styles.navLink} ${isActive('/guides') ? styles.active : ''}`}
          >
            {t('guides', { ns: 'common' })}
          </Link>
          <Link
            to="/about"
            className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
          >
            {t('about', { ns: 'common' })}
          </Link>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}
