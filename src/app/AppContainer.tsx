import { StrictMode } from 'react';
import App from './App.tsx';
//import App from './App2.tsx';
//import App from './App3.tsx';
//import App from './App4.tsx';

type AppContainerProps = {
  strict?: boolean;
};

const AppContainer = ({ strict }: AppContainerProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
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
