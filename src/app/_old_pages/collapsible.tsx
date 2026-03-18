import { useState } from 'react';
import { Button, Collapsible } from '@ui';
import { Page } from '@app/components';

export const PageCollapsible = () => {
  const [open, setOpen] = useState(false);

  return (
    <Page
      id="collapsible"
      title="Collapsible"
      menu={{
        overview: 'Overview',
        props: 'Props',
      }}
    >
      <Page.Article
        id="overview"
        title={false}
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

      <Page.Article id="props">
        <i>coming soon</i>
      </Page.Article>
    </Page>
  );
};
