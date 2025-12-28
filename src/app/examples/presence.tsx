import { useState } from 'react';
import { Button, Card, Presence } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `
import { Presence } from '@ui';

export default () => (
  <Presence />
);`;

export const PresenceDemo = () => {
  const [present, setPresent] = useState(true);

  return (
    <DemoContainer title="Presence" code={code} headless>
      <Button onClick={() => setPresent((prev) => !prev)}>Toggle</Button>
      <Presence
        asChild
        present={present}
        className="data-[visible=true]:animate-in data-[visible=false]:animate-out"
      >
        <Card className="w-80">
          <Card.Header>
            <Card.Title>Lorem ipsum dolor sit amet</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              labore praesentium ipsa delectus, veniam voluptas, tenetur aliquam
              cum nam voluptatem aliquid. Eligendi quas beatae ipsa repudiandae
              quo vel, culpa minima.
            </p>
          </Card.Content>
        </Card>
      </Presence>
    </DemoContainer>
  );
};
