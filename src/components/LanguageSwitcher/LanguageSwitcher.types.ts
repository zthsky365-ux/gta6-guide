export interface LanguageSwitcherProps {
  currentLang: 'zh' | 'en';
  onLanguageChange: (lang: 'zh' | 'en') => void;
}
