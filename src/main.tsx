import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PortfolioEnhancer from './portfolio-enhancer.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PortfolioEnhancer />
  </StrictMode>
);
