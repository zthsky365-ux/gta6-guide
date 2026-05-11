import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation(['common', 'guides']);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>GTA6 {t('siteTitle', { ns: 'common' })}</h3>
            <p className={styles.description}>
              {t('siteDescription', { ns: 'common' })}
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>{t('about', { ns: 'common' })}</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="/about">{t('about', { ns: 'common' })}</a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>{t('advertiseWithUs', { ns: 'guides' })}</h4>
            <p className={styles.contactInfo}>
              {t('contactUs', { ns: 'guides' })}: contact@gta6guide.com
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} GTA6 {t('siteTitle', { ns: 'common' })}. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            本网站与 Rockstar Games 无关，所有内容均为粉丝创作。
          </p>
        </div>
      </div>
    </footer>
  );
}
