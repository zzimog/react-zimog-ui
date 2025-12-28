import { Accordion, Card } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `
import { Accordion } from '@ui';

export default () => (
  <Accordion>
    <Accordion.Item>
      <Accordion.Trigger />
      <Accordion.Content />
    </Accordion.Item>
  </Accordion>
);`;

export const AccordionDemo = () => (
  <DemoContainer title="accordion" code={code}>
    <Card asChild className="w-80 gap-8 py-2">
      <Card.Content>
        <Accordion>
          <Accordion.Item value="1">
            <Accordion.Trigger>Lorem ipsum</Accordion.Trigger>
            <Accordion.Content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
              repudiandae optio praesentium id provident dolore quis ipsa?
              Quidem minus saepe odit consequatur!
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="2">
            <Accordion.Trigger>Dolor sit</Accordion.Trigger>
            <Accordion.Content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
              repudiandae optio praesentium id provident dolore quis ipsa?
              Quidem minus saepe odit consequatur!
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="3">
            <Accordion.Trigger>Consectetur</Accordion.Trigger>
            <Accordion.Content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
              repudiandae optio praesentium id provident dolore quis ipsa?
              Quidem minus saepe odit consequatur!
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Card.Content>
    </Card>
  </DemoContainer>
);
