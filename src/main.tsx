import { createRoot } from 'react-dom/client';
import AppContainer from './app/AppContainer.tsx';

createRoot(document.getElementById('root')!).render(
  <AppContainer strict={true} />
);
