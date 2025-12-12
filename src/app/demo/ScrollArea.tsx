import { Card, ScrollArea } from '@ui';
import { useEffect, useRef } from 'react';
import { DemoContainer } from './DemoContainer';

const code = `// Example code
import { ScrollArea } from '@ui';

export default () => (
  <ScrollArea>
    <ScrollArea.Viewport />
    <ScrollArea.Scrollbar />
    <ScrollArea.Corner />
  </ScrollArea>
);`;

export default () => {
  const halfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    halfRef.current?.scrollIntoView();
  }, []);

  return (
    <DemoContainer title="Scroll Area" code={code}>
      <ScrollArea as={Card} className="size-60 p-4">
        <ScrollArea.Viewport className="flex flex-col gap-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              ref={i === 25 ? halfRef : undefined}
              className="w-fit p-1 whitespace-nowrap border border-border"
            >
              {i}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto consectetur atque adipisci sunt repudiandae magnam,
              molestiae corporis odit ea mollitia repellat, sit consequuntur
              labore odio dignissimos alias nobis est dolorum!
            </div>
          ))}
        </ScrollArea.Viewport>
      </ScrollArea>
    </DemoContainer>
  );
};
