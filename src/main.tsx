import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Disclosure } from '@ui';
//import App from './App.tsx';

const useStrict = true;

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <Disclosure value={['d1']} multiple>
      <div className="gap-2">
        <Disclosure.Trigger value="d1">one</Disclosure.Trigger>
        <Disclosure.Content value="d1">Lorem</Disclosure.Content>
      </div>
      <div className="gap-2">
        <Disclosure.Trigger value="d2">two</Disclosure.Trigger>
        <Disclosure.Content value="d2">Ipsum</Disclosure.Content>
      </div>
      <div className="gap-2">
        <Disclosure.Trigger value="d3">three</Disclosure.Trigger>
        <Disclosure.Content value="d3">Dolor</Disclosure.Content>
      </div>
    </Disclosure>
  );
};

createRoot(document.getElementById('root')!).render(
  useStrict ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
