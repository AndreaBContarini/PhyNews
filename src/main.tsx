import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LogoPhyNews from './assets/LogoPhyNews.png';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Funzione per impostare il favicon
const setFavicon = (url: string) => {
  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
};

// Imposta il favicon con l'immagine importata
setFavicon(LogoPhyNews);
