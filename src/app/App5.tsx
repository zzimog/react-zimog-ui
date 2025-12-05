import { Card, ScrollArea } from '@ui';
import { useEffect, useRef } from 'react';

const App = () => {
  const halfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    halfRef.current?.scrollIntoView();
  }, []);

  return (
    <Card asChild className="size-80 p-6">
      <ScrollArea>
        <ScrollArea.Viewport>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              ref={i === 25 ? halfRef : undefined}
              className="w-120 py-4 text-justify not-last:mb-2 not-last:border-b"
            >
              [{i}] Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto consectetur atque adipisci sunt repudiandae magnam,
              molestiae corporis odit ea mollitia repellat, sit consequuntur
              labore odio dignissimos alias nobis est dolorum!
            </div>
          ))}
        </ScrollArea.Viewport>
      </ScrollArea>
    </Card>
  );
};

export default App;
