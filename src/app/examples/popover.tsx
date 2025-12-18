import { Button, Card, Popover } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example code
import { Popover } from '@ui';

export default () => (
  <Popover>
    <Popover.Trigger asChild>
      <Button>Toggle</Button>
    </Popover.Trigger>
    <Popover.Content asChild>
      <Card className="w-80 data-[visible=true]:animate-in data-[visible=false]:animate-out">
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

export const PopoverDemo = () => (
  <DemoContainer title="Popover" code={code} headless>
    <Popover>
      <Popover.Trigger asChild>
        <Button>Toggle</Button>
      </Popover.Trigger>
      <Popover.Content asChild avoidCollisions>
        <Card className="w-80 data-[visible=true]:animate-in data-[visible=false]:animate-out">
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
