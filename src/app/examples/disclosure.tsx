import { Button, Card, Disclosure } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example code
import { Disclosure } from '@ui';

export default () => (
  <Disclosure>
    <Disclosure.Item>
      <Disclosure.Trigger />
      <Disclosure.Content />
    </Disclosure.Item>
  </Disclosure>
);`;

export const DisclosureDemo = () => (
  <DemoContainer title="Disclosure" code={code} headless>
    <Card asChild className="w-80">
      <Card.Content>
        <Disclosure defaultValue="1" className="*:not-last:mb-4">
          <div className="flex gap-4">
            <Disclosure.Trigger value="1" asChild className="w-full">
              <Button>Lorem ipsum</Button>
            </Disclosure.Trigger>
            <Disclosure.Trigger value="2" asChild className="w-full">
              <Button>Id debitis</Button>
            </Disclosure.Trigger>
          </div>

          <Disclosure.Content value="1">
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Disclosure.Content>

          <Disclosure.Content value="2">
            2. Id debitis eius itaque rerum laboriosam magni natus doloribus.
          </Disclosure.Content>

          <Disclosure.Item value="3">
            <Disclosure.Trigger asChild className="w-full">
              <Button>Lorem ipsum dolor sit amet</Button>
            </Disclosure.Trigger>
            <Disclosure.Content as="p" className="mt-4">
              3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              omnis. Alias ratione nostrum laborum cum distinctio error aliquid
              veniam laudantium aspernatur, voluptate quam in neque nulla animi
              a, quas numquam?
            </Disclosure.Content>
          </Disclosure.Item>
        </Disclosure>
      </Card.Content>
    </Card>
  </DemoContainer>
);
