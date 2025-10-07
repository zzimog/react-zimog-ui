import { createRoot } from 'react-dom/client';
import AppContainer from './AppContainer.tsx';
//import App from './App.tsx';
import App from './App2.tsx';

createRoot(document.getElementById('root')!).render(
  <AppContainer strict={true}>
    <App />
  </AppContainer>
);
