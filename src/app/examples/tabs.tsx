import { Card, Tabs } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example code
import { Tabs } from '@ui';

export default () => (
  <Tabs>
    <Tabs.List>
      <Tabs.Trigger />
    </Tabs.List>
    <Tabs.Content />
  </Tabs>
);`;

export const TabsDemo = () => (
  <DemoContainer title="tabs" code={code}>
    <Card asChild className="w-120">
      <Card.Content>
        <Tabs defaultValue="1">
          <Tabs.List>
            <Tabs.Trigger value="1">Lorem ipsum</Tabs.Trigger>
            <Tabs.Trigger value="2">Dolor</Tabs.Trigger>
            <Tabs.Trigger value="3">Sit amet</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="1" className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quod,
            officia inventore vero nulla tempore quae itaque. Ullam, numquam
            error, autem vel voluptatibus placeat aperiam officia asperiores
            praesentium, incidunt deserunt!
          </Tabs.Content>
          <Tabs.Content value="2" className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est non
            expedita eaque porro sunt cumque quam quibusdam facilis id inventore
            laboriosam, nostrum tempora perferendis reiciendis et unde harum
            dicta eum.
          </Tabs.Content>
          <Tabs.Content value="3" className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            dolorem, quis delectus fugiat velit maiores deleniti et quas laborum
            provident vitae nobis culpa laboriosam harum facilis earum
            voluptatum quae quo!
          </Tabs.Content>
        </Tabs>
      </Card.Content>
    </Card>
  </DemoContainer>
);
