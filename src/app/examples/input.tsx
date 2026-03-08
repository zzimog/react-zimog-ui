import { User } from 'lucide-react';
import { Field, Input, Text } from '@ui';
import { Page } from '@app/components/Page';

export default () => (
  <Page id="input" title="Input">
    <Page.Nav>
      <Page.Nav.Item href="#input-default" label="Default" />
      <Page.Nav.Item href="#input-group-addons" label="Group & Addons" />
      <Page.Nav.Item href="#input-props" label="Props" />
    </Page.Nav>

    <Page.Article
      id="input-default"
      title="Default"
      description={
        <>
          Standard <Text.Code children={`<Input />`} /> component inside a{' '}
          <Text.Code children={`<Field />`} /> element.
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
      children={
        <Field>
          <Field.Label>First Name</Field.Label>
          <Input placeholder="First Name" />
          <Field.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            quaerat deserunt sunt incidunt atque quos amet ex dicta.
          </Field.Description>
        </Field>
      }
    />

    <Page.Article
      id="input-group-addons"
      title="Group & Addons"
      description={
        <>
          Wrap your <Text.Code children={`<Input />`} /> in a{' '}
          <Text.Code children={`<Input.Group />`} /> component and add{' '}
          <Text.Code children={`<Input.Addon />`} /> to show icons or others
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
        <Input.Group>
          <Input.Addon>
            <User />
          </Input.Addon>
          <Input placeholder="Username" />
        </Input.Group>
      }
    />

    <Page.Article id="input-props" title="Props">
      <i>coming soon</i>
    </Page.Article>
  </Page>
);
