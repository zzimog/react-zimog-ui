import { StrictMode } from 'react';
import App from './App2.tsx';
import '../ui/style/index.css';

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
