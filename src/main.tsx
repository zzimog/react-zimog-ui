import { createRoot } from 'react-dom/client';
import AppContainer from './app/AppContainer.tsx';
import '@ui';

createRoot(document.getElementById('root')!).render(
  <AppContainer strict={true} />
);
