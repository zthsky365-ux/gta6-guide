import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCommon from './zh/common.json';
import zhNavigation from './zh/navigation.json';
import zhGuides from './zh/guides.json';
import enCommon from './en/common.json';
import enNavigation from './en/navigation.json';
import enGuides from './en/guides.json';

i18n.use(initReactI18next).init({
  resources: {
    zh: {
      common: zhCommon,
      navigation: zhNavigation,
      guides: zhGuides,
    },
    en: {
      common: enCommon,
      navigation: enNavigation,
      guides: enGuides,
    },
  },
  lng: 'zh',
  fallbackLng: 'zh',
  ns: ['common', 'navigation', 'guides'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
