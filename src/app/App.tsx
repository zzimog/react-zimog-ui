import { ThemeSwitcher, Title } from '@ui';
import Card from './demo/card';
import Disclosure from './demo/disclosure';
import Popover from './demo/popover';
import Presence from './demo/presence';
import ScrollArea from './demo/scrollarea';

const demos = [Card, Disclosure, Popover, Presence, ScrollArea];

export const Container = (props: any) => (
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
      {props.children}
    </div>
  </div>
);

export default () => (
  <Container>
    <Title className="text-4xl self-start">UI Demo</Title>
    {demos.map((Demo, i) => (
      <Demo key={i} />
    ))}
  </Container>
);
