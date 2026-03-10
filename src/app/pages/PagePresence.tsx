import { useState } from 'react';
import { Button, Card, Presence } from '@ui';
import { Page } from '@app/components';
import { DemoContainer } from '../components/demo-container';

const code = `
import { Presence } from '@ui';

export default () => {
  const [present, setPresent] = useState(true);

  return (
    <>
      <Button onClick={() => setPresent(!present)}>Toggle</Button>
      <Presence present={present} asChild>
        <Card as="p" className="bg-background mt-2 px-4 py-2.5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          perspiciatis aspernatur fugiat autem magni quidem similique, odio
          officiis maiores quod. Atque tempore, minus harum ea consectetur
          amet provident eius alias!
        </Card>
      </Presence>
    </>
  );
};
`;

export const PagePresence = () => {
  const [present, setPresent] = useState(true);

  return (
    <Page
      id="presence"
      title="Presence"
      menu={{
        overview: 'Overview',
        props: 'Props',
      }}
    >
      <Page.Article
        id="overview"
        description="Dynamic utility component which awaits possible CSS animation before unmounting."
        code={code}
      >
        <div className="mx-auto max-w-md">
          <Button className="w-full" onClick={() => setPresent(!present)}>
            Toggle
          </Button>
          <Presence present={present} asChild>
            <Card as="p" className="bg-background mt-2 px-4 py-2.5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              perspiciatis aspernatur fugiat autem magni quidem similique, odio
              officiis maiores quod. Atque tempore, minus harum ea consectetur
              amet provident eius alias!
            </Card>
          </Presence>
        </div>
      </Page.Article>

      <Page.Article id="props">
        <i>coming soon</i>
      </Page.Article>
    </Page>
  );
};
