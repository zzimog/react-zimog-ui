import { Accordion, Code } from '@ui';
import { Page } from '@app/components';

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

export const PageAccordion = () => (
  <Page
    id="accordion"
    title="Accordion"
    menu={{
      overview: 'Overview',
      props: 'Props',
    }}
  >
    <Page.Article
      id="overview"
      description={
        <>
          The <Code>{'<Accordion />'}</Code> component let user expand and
          collapse sections with lot of secondary content.
        </>
      }
      code={`
        <Accordion>
          <Accordion.Item>
            <Accordion.Trigger />
            <Accordion.Content />
          </Accordion.Item>
        </Accordion>
      `}
    >
      <Accordion className="mx-auto max-w-md">
        <Accordion.Item value="1">
          <Accordion.Trigger>Lorem ipsum</Accordion.Trigger>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Trigger>Dolor sit</Accordion.Trigger>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="3">
          <Accordion.Trigger>Consectetur</Accordion.Trigger>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            molestiae sit dignissimos autem voluptates, aliquid sunt explicabo
            repudiandae optio praesentium id provident dolore quis ipsa? Quidem
            minus saepe odit consequatur!
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Page.Article>

    <Page.Article id="props">
      <i>coming soon</i>
    </Page.Article>
  </Page>
);
