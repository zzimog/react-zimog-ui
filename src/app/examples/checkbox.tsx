import { useId, type ComponentProps } from 'react';
import { Checkbox, Code, Field } from '@ui';
import { Page } from '@app/components';

const DemoField = (props: ComponentProps<typeof Checkbox>) => {
  const id = useId();

  return (
    <Field direction="horizontal" className="mx-auto max-w-md">
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
  <Page
    id="checkbox"
    title="Checkbox"
    menu={{
      overview: 'Overview',
      checked: 'Checked',
      disabled: 'Disabled',
      invalid: 'Invalid',
      props: 'Props',
    }}
  >
    <Page.Article
      id="checkbox-overview"
      title="Overview"
      description={
        <>
          The <Code>{`<Checkbox />`}</Code> component is a form control which
          represents a binary choice, user can toggle between checked or
          unchecked state.
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
      children={<DemoField />}
    />

    <Page.Article
      id="checkbox-checked"
      title="Checked"
      description={
        <>
          Use <Code>checked</Code> and <Code>onCheckedChange</Code> to actively
          control the checkbox state, or <Code>defaultChecked</Code> for
          uncontrolled state.
        </>
      }
      code={`
        export default () => {
          const [checked, setChecked] = useState(true);

          return (
            <>
              <Checkbox defaultChecked />
              <Checkbox checked={checked} onCheckedChange={setChecked} />
            </>
          );
        }
      `}
      children={<DemoField defaultChecked />}
    />

    <Page.Article
      id="checkbox-disabled"
      title="Disabled"
      description={
        <>
          Use <Code>disabled</Code> prop to disable the{' '}
          <Code>{`<Checkbox />`}</Code> component.
        </>
      }
      code={`<Checkbox disabled />`}
      children={<DemoField disabled />}
    />

    <Page.Article
      id="checkbox-invalid"
      title="Invalid"
      description={
        <>
          Use <Code>aria-invalid</Code> attribute to set{' '}
          <Code>{`<Checkbox />`}</Code> as invalid.
        </>
      }
      code={`<Checkbox aria-invalid />`}
      children={<DemoField aria-invalid />}
    />

    <Page.Article id="checkbox-props" title="Props">
      <i>coming soon</i>
    </Page.Article>
  </Page>
);
