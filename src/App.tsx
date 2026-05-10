import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Home from '@/pages/Home/Home';
import GuideList from '@/pages/GuideList/GuideList';
import GuideDetail from '@/pages/GuideDetail/GuideDetail';
import About from '@/pages/About/About';
import { useTranslation } from 'react-i18next';
import './index.css';

export default function App() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return (
    <HelmetProvider>
      <BrowserRouter basename="/gta6-guide">
        <div className="app">
          <Header
            currentLang={i18n.language as 'zh' | 'en'}
            onLanguageChange={handleLanguageChange}
          />

          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guides" element={<GuideList />} />
              <Route path="/guides/:slug" element={<GuideDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
