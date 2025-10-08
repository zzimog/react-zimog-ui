import { createRoot } from 'react-dom/client';
import AppContainer from './AppContainer.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <AppContainer strict={false}>
    <App />
  </AppContainer>
);
