import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const useStrict = false;

createRoot(document.getElementById('root')!).render(
  useStrict ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
