import { useTranslation } from 'react-i18next';
import type { LanguageSwitcherProps } from './LanguageSwitcher.types';
import styles from './LanguageSwitcher.module.css';

function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const { t } = useTranslation('navigation');

  const toggleLanguage = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    onLanguageChange(newLang);
  };

  return (
    <button
      className={styles.switcher}
      onClick={toggleLanguage}
      title={currentLang === 'zh' ? t('switchToEn') : t('switchToZh')}
      aria-label="Switch language"
    >
      <span className={styles.currentLang}>{currentLang === 'zh' ? '中' : 'EN'}</span>
      <span className={styles.divider}>/</span>
      <span className={styles.targetLang}>{currentLang === 'zh' ? 'EN' : '中'}</span>
    </button>
  );
}

export default LanguageSwitcher;
