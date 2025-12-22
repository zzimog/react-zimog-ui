import { Button, Card, Collapsible } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example
import { Collapsible } from '@ui';

export default () => (
  <Collapsible>
    <Collapsible.Trigger />
    <Collapsible.Content />
  </Collapsible>
);`;

export const CollapsibleDemo = () => (
  <DemoContainer title="collapsible" code={code} headless>
    <Card asChild className="w-80">
      <Card.Content>
        <Collapsible>
          <Collapsible.Trigger asChild className="w-full">
            <Button>Lorem ipsum dolor sit amet</Button>
          </Collapsible.Trigger>
          <Collapsible.Content as="p" className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </Collapsible.Content>
        </Collapsible>
      </Card.Content>
    </Card>
  </DemoContainer>
);
