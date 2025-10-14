import { createRoot } from 'react-dom/client';
import AppContainer from './app/AppContainer.tsx';
import '@fontsource-variable/manrope/index.css';

createRoot(document.getElementById('root')!).render(
  <AppContainer strict={false} />
);
