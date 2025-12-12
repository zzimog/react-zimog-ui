import '@fontsource-variable/manrope/index.css';
import { ThemeSwitcher, Title } from '@ui';
import '../ui/style/index.css';
import Popover from './demo/Popover.tsx';
import ScrollArea from './demo/ScrollArea.tsx';

const AppContainer = () => {
  return (
    <div
      className={[
        'min-h-screen',
        'flex',
        'justify-center',
        'items-center',
        'p-4',
        'transition-colors',
        'text-foreground',
        'bg-white',
        'dark:text-background',
        'dark:bg-black',
      ].join(' ')}
    >
      <ThemeSwitcher className="fixed top-2 right-2" />
      <div className="max-w-200 w-full flex flex-col items-center gap-10 py-16">
        <Title className="text-4xl self-start">UI Demo</Title>
        <ScrollArea />
        <Popover />
      </div>
    </div>
  );
};

export default AppContainer;
