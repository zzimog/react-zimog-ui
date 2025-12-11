import { Card, ScrollArea, Title } from '@ui';
import { useEffect, useRef } from 'react';
import { CodeBlock } from './CodeBlock';

const code = `// Example code
import { ScrollArea } from '@ui';

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
      className="w-fit p-1 whitespace-nowrap border"
    >
      {i}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
      consectetur atque adipisci sunt repudiandae magnam, molestiae corporis
      odit ea mollitia repellat, sit consequuntur labore odio dignissimos alias
      nobis est dolorum!
    </div>
  ));
};

const DemoScrollArea = () => {
  return (
    <div className="max-w-200 w-full">
      <Title size={2} className="mb-4 leading-none">
        Scroll Area
      </Title>

      <div className="px-4 py-20 rounded-t-shape bg-linear-to-br from-indigo-500 to-violet-500">
        <ScrollArea as={Card} className="size-60 mx-auto p-4">
          <ScrollArea.Viewport className="flex flex-col gap-2">
            <Content />
          </ScrollArea.Viewport>
        </ScrollArea>
      </div>

      <Card className="w-full py-0 rounded-t-none">
        <CodeBlock>{code}</CodeBlock>
      </Card>
    </div>
  );
};

export default DemoScrollArea;
