import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import styles from './About.module.css';

export default function About() {
  const { t } = useTranslation(['common', 'guides']);
  const siteTitle = t('siteTitle', { ns: 'common' });
  const siteDescription = t('siteDescription', { ns: 'common' });

  return (
    <div className={styles.page}>
      <SEO title={t('about', { ns: 'common' })} description={siteDescription} />

      <div className={styles.container}>
        <Breadcrumb />

        <div className={styles.content}>
          <h1 className={styles.title}>{t('about', { ns: 'common' })}</h1>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{siteTitle}</h2>
            <p className={styles.description}>
              {t('aboutDescription', { ns: 'guides' })}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('contactUs', { ns: 'guides' })}</h2>
            <ul className={styles.contactList}>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@gta6guide.com" className={styles.link}>
                  contact@gta6guide.com
                </a>
              </li>
              <li>
                <strong>GitHub:</strong>{' '}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  github.com/gta6guide
                </a>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('advertiseWithUs', { ns: 'guides' })}</h2>
            <p className={styles.description}>
              如果您对在我们的网站上投放广告感兴趣，请通过以下方式联系我们：
            </p>
            <ul className={styles.contactList}>
              <li>
                <strong>广告合作邮箱:</strong>{' '}
                <a href="mailto:ad@gta6guide.com" className={styles.link}>
                  ad@gta6guide.com
                </a>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>免责声明</h2>
            <p className={styles.description}>
              本网站为粉丝创作的非官方网站，与 Rockstar Games 没有任何关联。
              所有游戏内容版权归其各自所有者所有。本网站的所有内容仅供参考，
              我们不对内容的准确性作任何保证。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
