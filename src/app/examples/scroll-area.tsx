import { Card, ScrollArea } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `
import { ScrollArea } from '@ui';

export default () => (
  <ScrollArea />
);`;

const items = Array.from({ length: 50 }).map((_, i) => i);

export const ScrollAreaDemo = () => (
  <DemoContainer title="Scroll Area" code={code}>
    <ScrollArea as={Card} className="size-60">
      <div className="p-2">
        {items.map((i) => (
          <div key={i} className="p-2 whitespace-nowrap not-last:border-b">
            {i}. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto consectetur atque adipisci sunt repudiandae magnam,
            molestiae corporis odit ea mollitia repellat, sit consequuntur
            labore odio dignissimos alias nobis est dolorum!
          </div>
        ))}
      </div>
    </ScrollArea>
  </DemoContainer>
);
