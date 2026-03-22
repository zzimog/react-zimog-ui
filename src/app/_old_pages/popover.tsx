import { Button, Card, Popper } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `
import { Popper } from '@ui';

export default () => (
  <Popper>
    <Popper.Trigger />
    <Popper.Content />
  </Popper>
);`;

export const PopperDemo = () => (
  <DemoContainer title="Popper" code={code} headless>
    <Popper>
      <Popper.Trigger asChild>
        <Button>Toggle</Button>
      </Popper.Trigger>
      <Popper.Content avoidCollisions>
        <Card className="w-80">
          <Card.Content className="-my-1.5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            temporibus dolorum accusantium, praesentium dicta mollitia corporis
            voluptatem non ex eius reiciendis totam culpa voluptate tempora
            deleniti quo? Eum, inventore architecto?
          </Card.Content>
        </Card>
      </Popper.Content>
    </Popper>
  </DemoContainer>
);
