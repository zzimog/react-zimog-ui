import { StrictMode } from 'react';
import '@ui';
//import App from './App.tsx';
//import App from './App2.tsx';
import App from './App2.tsx';

type AppContainerProps = {
  strict?: boolean;
};

const AppContainer = ({ strict }: AppContainerProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {strict ? (
        <StrictMode>
          <App />
        </StrictMode>
      ) : (
        <App />
      )}
    </div>
  );
};

export default AppContainer;
