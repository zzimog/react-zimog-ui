import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './Test3';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
