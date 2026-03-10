import { useId, type ComponentProps } from 'react';
import { User } from 'lucide-react';
import { Code, Field, Input } from '@ui';
import { Page } from '@app/components';

const DemoField = (props: ComponentProps<typeof Input>) => {
  const id = useId();

  return (
    <Field className="mx-auto max-w-md">
      <Field.Label htmlFor={id}>Lorem ipsum dolor sit</Field.Label>
      <Input id={id} {...props} />
      <Field.Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Field.Description>
    </Field>
  );
};

export const PageInput = () => (
  <Page
    id="input"
    title="Input"
    menu={{
      overview: 'Overview',
      groupaddons: 'Group & Addons',
      props: 'Props',
    }}
  >
    <Page.Article
      id="overview"
      description={
        <>
          Basic <Code>{`<Input />`}</Code> component to input data.
        </>
      }
      code={`
        <Field>
          <Field.Label>First Name</Field.Label>
          <Input placeholder="First Name" />
          <Field.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            quaerat deserunt sunt incidunt atque quos amet ex dicta.
          </Field.Description>
        </Field>
      `}
      children={<DemoField placeholder="Lorem ipsum" />}
    />

    <Page.Article
      id="groupaddons"
      description={
        <>
          Wrap your <Code>{`<Input />`}</Code> in a{' '}
          <Code children={`<Input.Group />`} /> component and add{' '}
          <Code children={`<Input.Addon />`} /> to show icons or others
          decorative elements in your field.
        </>
      }
      code={`
        <Input.Group>
          <Input.Addon>
            <User />
          </Input.Addon>
          <Input placeholder="Username" />
        </Input.Group>
      `}
      children={
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <Input.Group>
            <Input.Addon>
              <User />
            </Input.Addon>
            <Input placeholder="Username" />
          </Input.Group>
          <Input.Group>
            <Input.Addon>http://</Input.Addon>
            <Input placeholder="your-subdomain" />
            <Input.Addon>.example.com</Input.Addon>
          </Input.Group>
          <Input.Group>
            <Input placeholder="name.surname" className="text-right" />
            <Input.Addon>@example.com</Input.Addon>
          </Input.Group>
        </div>
      }
    />

    <Page.Article id="props">
      <i>coming soon</i>
    </Page.Article>
  </Page>
);
