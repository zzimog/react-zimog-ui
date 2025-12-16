import { ThemeSwitcher, Title } from '@ui';
import Card from './demo/card';
import Disclosure from './demo/disclosure';
import Popover from './demo/popover';
import Presence from './demo/presence';
import ScrollArea from './demo/scroll-area';
import { useState } from 'react';

const demos: Record<string, any> = {
  card: Card,
  disclosure: Disclosure,
  popover: Popover,
  presence: Presence,
  scrollarea: ScrollArea,
};

const Menu = (props: { onCompChange: any }) => (
  <nav aria-label="main menu" className="flex flex-wrap gap-x-4 gap-y-2">
    {['all', ...Object.keys(demos)].map((key) => (
      <span
        key={key}
        role="link"
        title={key}
        className="font-semibold cursor-pointer underline-offset-4 hover:underline"
        onClick={() => props?.onCompChange(key)}
      >
        {key}
      </span>
    ))}
  </nav>
);

const All = () => (
  <>
    {Object.values(demos).map((Comp, i) => (
      <Comp key={i} />
    ))}
  </>
);

export default () => {
  const [compKey, setCompKey] = useState<string>('all');
  const Comp = demos[compKey];

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
      <div className="max-w-200 w-full flex flex-col gap-10 mx-auto px-4 py-16">
        <Title className="text-4xl self-start">UI Demo</Title>
        <Menu onCompChange={setCompKey} />
        {compKey === 'all' ? <All /> : <Comp />}
      </div>
    </div>
  );
};
