import { Card, ScrollArea } from '@ui';
import { useEffect, useRef } from 'react';
import { Code } from './Code';

const code = `import { ScrollArea } from '@ui';

export default () => (
  <ScrollArea>
    <ScrollArea.Viewport />
    <ScrollArea.Scrollbar />
    <ScrollArea.Corner />
  </ScrollArea>
);`;

const Content = () => {
  const halfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    halfRef.current?.scrollIntoView();
  }, []);

  return Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      ref={i === 25 ? halfRef : undefined}
      className="w-fit p-2 whitespace-nowrap border"
    >
      [{i}] Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
      consectetur atque adipisci sunt repudiandae magnam, molestiae corporis
      odit ea mollitia repellat, sit consequuntur labore odio dignissimos alias
      nobis est dolorum!
    </div>
  ));
};

const App = () => {
  return (
    <div>
      <ScrollArea as={Card} className="size-80 p-6">
        <ScrollArea.Viewport className="flex flex-col gap-2">
          <Content />
        </ScrollArea.Viewport>
      </ScrollArea>

      <Card className="mt-4">
        <Card.Content>
          <Code>{code}</Code>
        </Card.Content>
      </Card>
    </div>
  );
};

export default App;
