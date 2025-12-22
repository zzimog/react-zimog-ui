import { Fragment } from 'react';
import { Card, ScrollArea } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example code
import { ScrollArea } from '@ui';

export default () => (
  <ScrollArea />
);`;

export const ScrollAreaDemo = () => (
  <DemoContainer title="Scroll Area" code={code}>
    <ScrollArea as={Card} className="size-60 p-4">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 50 }).map((_, i) => (
          <Fragment key={i}>
            <div className="w-fit whitespace-nowrap">
              {i}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto consectetur atque adipisci sunt repudiandae magnam,
              molestiae corporis odit ea mollitia repellat, sit consequuntur
              labore odio dignissimos alias nobis est dolorum!
            </div>
            <div className="bg-border my-1 h-px" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  </DemoContainer>
);
