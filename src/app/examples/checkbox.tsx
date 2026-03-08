import { useId, type ComponentProps } from 'react';
import { Checkbox, Field, Text } from '@ui';
import { Page } from '@app/components/Page';

const DemoField = (props: ComponentProps<typeof Checkbox>) => {
  const id = useId();

  return (
    <Field direction="horizontal">
      <Checkbox id={id} {...props} />
      <Field.Content>
        <Field.Label htmlFor={id}>Lorem ipsum dolor sit</Field.Label>
        <Field.Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Field.Description>
      </Field.Content>
    </Field>
  );
};

export default () => (
  <Page title="Checkbox">
    <Page.Nav>
      <Page.Nav.Item href="#checkbox-default" label="Default" />
      <Page.Nav.Item href="#checkbox-disabled" label="Disabled" />
      <Page.Nav.Item href="#checkbox-invalid" label="Invalid" />
      <Page.Nav.Item href="#checkbox-props" label="Props" />
    </Page.Nav>

    <Page.Article
      id="checkbox-default"
      title="Default"
      description={
        <>
          Standard <Text.Code>{`<Checkbox />`}</Text.Code> component.
        </>
      }
      code={`
        <Field direction="horizontal">
          <Checkbox />
          <Field.Content>
            <Field.Label>
              Lorem ipsum dolor sit
            </Field.Label>
            <Field.Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Field.Description>
          </Field.Content>
        </Field>
      `}
    >
      <DemoField />
    </Page.Article>

    <Page.Article
      id="checkbox-disabled"
      title="Disabled"
      description={
        <>
          Use <Text.Code>disabled</Text.Code> prop to disable the{' '}
          <Text.Code>{`<Checkbox />`}</Text.Code> component.
        </>
      }
      code={`<Checkbox disabled />`}
    >
      <DemoField disabled />
    </Page.Article>

    <Page.Article
      id="checkbox-invalid"
      title="Invalid"
      description={
        <>
          Use <Text.Code>aria-invalid</Text.Code> attribute to set{' '}
          <Text.Code>{`<Checkbox />`}</Text.Code> as invalid.
        </>
      }
      code={`<Checkbox aria-invalid />`}
    >
      <DemoField aria-invalid />
    </Page.Article>

    <Page.Article id="checkbox-props" title="Props">
      <i>coming soon</i>
    </Page.Article>
  </Page>
);
