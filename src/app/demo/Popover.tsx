import { Button, Card, Popover } from '@ui';
import { DemoContainer } from './DemoContainer';

const code = `// Example code
import { Popover } from '@ui';

export default () => (
  <Popover>
    <Popover.Trigger asChild>
      <Button>Toggle</Button>
    </Popover.Trigger>
    <Popover.Content asChild>
      <Card className="w-80">
        <Card.Content className="-my-1.5 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          temporibus dolorum accusantium, praesentium dicta mollitia corporis
          voluptatem non ex eius reiciendis totam culpa voluptate tempora
          deleniti quo? Eum, inventore architecto?
        </Card.Content>
      </Card>
    </Popover.Content>
  </Popover>
);`;

export default () => (
  <DemoContainer title="Popover" code={code}>
    <Popover>
      <Popover.Trigger asChild>
        <Button>Toggle</Button>
      </Popover.Trigger>
      <Popover.Content asChild>
        <Card className="w-80">
          <Card.Content className="-my-1.5 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            temporibus dolorum accusantium, praesentium dicta mollitia corporis
            voluptatem non ex eius reiciendis totam culpa voluptate tempora
            deleniti quo? Eum, inventore architecto?
          </Card.Content>
        </Card>
      </Popover.Content>
    </Popover>
  </DemoContainer>
);
