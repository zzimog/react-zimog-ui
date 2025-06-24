import { styled, ButtonGroup, Button } from '@zui';
import guid from '@/utils/guid';
import { type FormSchema, Form } from '@/ui/Form';

const schema: FormSchema = [
  [
    {
      label: 'Order ID',
      name: 'guid',
      type: 'string',
      readOnly: true,
      value: () => guid(16),
    },
    {
      label: 'Holder',
      name: 'holder',
      type: 'string',
    },
  ],
  {
    name: 'products',
    type: 'multi',
    fields: [
      {
        label: 'Product',
        name: 'product_name',
        type: 'text',
      },
      {
        label: 'Quantity',
        name: 'product_qta',
        type: 'number',
        defaultValue: 0,
      },
      {
        label: 'Price',
        name: 'product_price',
        type: 'number',
        step: '0.10',
      },
    ],
  },
];

const AppRoot = styled.div({
  width: '800px',
  margin: '0 auto',
  padding: '32px 0',
});

function App() {
  return (
    <AppRoot>
      <ButtonGroup>
        <Button label="Some kind of button" />
        <Button label="Some kind of button" />
        <Button label="Some kind of button" />
        <ButtonGroup>
          <Button label="Some kind of button" />
          <Button label="Some kind of button" />
          <Button label="Some kind of button" />
        </ButtonGroup>
      </ButtonGroup>
      <Form schema={schema} />
    </AppRoot>
  );
}

export default App;
