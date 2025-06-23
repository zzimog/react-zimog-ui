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

function App() {
  return <Form schema={schema} />;
}

export default App;
