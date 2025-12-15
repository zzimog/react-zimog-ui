import { Disclosure } from '@ui';
import { Container } from './App';
import { Collapsible } from './Test2';

export default () => (
  <Container>
    <Disclosure>
      <Disclosure.Item value="0">
        <Disclosure.Trigger>Toggle</Disclosure.Trigger>
        <Disclosure.Content>
          {({ open }) => (
            <Collapsible open={open}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
              repudiandae optio praesentium id provident dolore quis ipsa?
              Quidem minus saepe odit consequatur!
            </Collapsible>
          )}
        </Disclosure.Content>
      </Disclosure.Item>
    </Disclosure>
  </Container>
);
