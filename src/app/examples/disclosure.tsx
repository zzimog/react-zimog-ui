import { Button, Disclosure } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example code
import { Button, Disclosure } from '@ui';

export default () => (
  <Disclosure defaultValue="1">
    <div className="w-80">
      <div className="flex gap-2">
        <Disclosure.Trigger value="1" asChild>
          <Button>Toggle 1</Button>
        </Disclosure.Trigger>
        <Disclosure.Trigger value="2" asChild>
          <Button>Toggle 2</Button>
        </Disclosure.Trigger>
      </div>

      <div className="py-2">
        <Disclosure.Content value="1">
          1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Disclosure.Content>

        <Disclosure.Content value="2">
          2. Id debitis eius itaque rerum laboriosam magni natus doloribus.
        </Disclosure.Content>
      </div>

      <Disclosure.Item value="3">
        <Disclosure.Trigger asChild>
          <Button>Toggle 3</Button>
        </Disclosure.Trigger>
        <Disclosure.Content asChild>
          <p className="py-2">
            3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            omnis. Alias ratione nostrum laborum cum distinctio error aliquid
            veniam laudantium aspernatur, voluptate quam in neque nulla animi
            a, quas numquam?
          </p>
        </Disclosure.Content>
      </Disclosure.Item>
    </div>
  </Disclosure>
);`;

export const DisclosureDemo = () => (
  <DemoContainer title="Disclosure" code={code} headless>
    <Disclosure defaultValue="1">
      <div className="w-80">
        <div className="flex gap-2">
          <Disclosure.Trigger value="1" asChild>
            <Button>Toggle 1</Button>
          </Disclosure.Trigger>
          <Disclosure.Trigger value="2" asChild>
            <Button>Toggle 2</Button>
          </Disclosure.Trigger>
        </div>

        <div className="py-2">
          <Disclosure.Content value="1">
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Disclosure.Content>

          <Disclosure.Content value="2">
            2. Id debitis eius itaque rerum laboriosam magni natus doloribus.
          </Disclosure.Content>
        </div>

        <Disclosure.Item value="3">
          <Disclosure.Trigger asChild>
            <Button>Toggle 3</Button>
          </Disclosure.Trigger>
          <Disclosure.Content asChild>
            <p className="py-2">
              3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              omnis. Alias ratione nostrum laborum cum distinctio error aliquid
              veniam laudantium aspernatur, voluptate quam in neque nulla animi
              a, quas numquam?
            </p>
          </Disclosure.Content>
        </Disclosure.Item>
      </div>
    </Disclosure>
  </DemoContainer>
);
