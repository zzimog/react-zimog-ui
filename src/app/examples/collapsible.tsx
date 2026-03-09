import { useState } from 'react';
import { Button, Card, Collapsible } from '@ui';
import { Page } from '@app/components/Page';
import { DemoContainer } from '../components/demo-container';

const code = `
import { Collapsible } from '@ui';

export default () => (
  <Collapsible />
)`;

export const CollapsibleDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoContainer title="collapsible" code={code} headless>
      <Card className="w-80">
        <Card.Content>
          <Button className="w-full" onClick={() => setOpen(!open)}>
            Lorem ipsum dolor sit amet
          </Button>
          <Collapsible open={open}>
            <p className="pt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
              repudiandae optio praesentium id provident dolore quis ipsa?
              Quidem minus saepe odit consequatur!
            </p>
          </Collapsible>
        </Card.Content>
      </Card>
    </DemoContainer>
  );
};

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Page title="Collapsible">
      <Page.Nav>
        <Page.Nav.Item href="#collapsible-overview" label="Overview" />
        <Page.Nav.Item href="#collapsible-props" label="Props" />
      </Page.Nav>

      <Page.Article
        id="collapsible-overview"
        title="Overview"
        description="Animated component which expands to reveal content and collapses to hide it."
        code={`
          export default () => {
            const [open, setOpen] = useState(false);

            return (
              <>
                <Button onClick={() => setOpen(!open)}>
                  Lorem ipsum dolor sit amet
                </Button>
                <Collapsible open={open}>
                  <p className="mt-4 border px-4 py-2.5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
                    molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
                    repudiandae optio praesentium id provident dolore quis ipsa?
                    Quidem minus saepe odit consequatur!
                  </p>
                </Collapsible>
              </>
            );
          }
        `}
        children={
          <div className="mx-auto h-64 max-w-80">
            <Button className="w-full" onClick={() => setOpen(!open)}>
              Lorem ipsum dolor sit amet
            </Button>
            <Collapsible open={open}>
              <p className="mt-4 border px-4 py-2.5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Nesciunt molestiae sit dignissimos autem voluptates, aliquid
                sunt explicabo repudiandae optio praesentium id provident dolore
                quis ipsa? Quidem minus saepe odit consequatur!
              </p>
            </Collapsible>
          </div>
        }
      />

      <Page.Article id="collapsible-props" title="Props">
        <i>coming soon</i>
      </Page.Article>
    </Page>
  );
};
