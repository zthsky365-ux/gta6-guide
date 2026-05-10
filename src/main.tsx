import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from '@/i18n';
import App from './App';

// 初始化 i18n
i18n.init().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
