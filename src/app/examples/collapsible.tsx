import { useState } from 'react';
import { Button, Card, Collapsible } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `
import { Collapsible } from '@ui';

export default () => (
  <Collapsible />
)`;

export const CollapsibleDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoContainer title="collapsible" code={code} headless>
      <Card className="w-80">
        <Card.Content>
          <Button className="w-full" onClick={() => setOpen(!open)}>
            Lorem ipsum dolor sit amet
          </Button>
          <Collapsible open={open}>
            <p className="pt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
              repudiandae optio praesentium id provident dolore quis ipsa?
              Quidem minus saepe odit consequatur!
            </p>
          </Collapsible>
        </Card.Content>
      </Card>
    </DemoContainer>
  );
};
