import '@fontsource-variable/manrope/index.css';
import { ThemeSwitcher, Title } from '@ui';
import Card from './demo/Card.tsx';
import Popover from './demo/Popover.tsx';
import ScrollArea from './demo/ScrollArea.tsx';

const AppContainer = () => {
  return (
    <div
      className={[
        'min-h-screen',
        'transition-colors',
        'text-foreground',
        'bg-white',
        'dark:text-background',
        'dark:bg-black',
      ].join(' ')}
    >
      <ThemeSwitcher className="fixed top-2 right-2" />
      <div className="max-w-200 w-full flex flex-col items-center gap-10 mx-auto py-16">
        <Title className="text-4xl self-start">UI Demo</Title>
        <Card />
        <Popover />
        <ScrollArea />
      </div>
    </div>
  );
};

export default AppContainer;
