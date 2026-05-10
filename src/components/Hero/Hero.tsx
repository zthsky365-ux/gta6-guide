import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation('guides');

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{t('heroTitle')}</h1>
        <p className={styles.subtitle}>{t('heroSubtitle')}</p>
        <div className={styles.actions}>
          <Link to="/guides" className={styles.primaryBtn}>
            {t('allGuides')}
          </Link>
          <Link to="/about" className={styles.secondaryBtn}>
            {t('about', { ns: 'common' })}
          </Link>
        </div>
      </div>
    </section>
  );
}
