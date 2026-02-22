import { Lock, User } from 'lucide-react';
import { Card, Input, Select, Title } from '@ui';

export const TestPage = () => {
  return (
    <>
      <Title>Input</Title>

      <Card>
        <Card.Content className="flex flex-col gap-4">
          <Input.Group>
            <Input.Addon>
              <User />
            </Input.Addon>
            <Input type="text" placeholder="Username" />
          </Input.Group>

          <Input.Group>
            <Input.Addon>
              <Lock />
            </Input.Addon>
            <Input type="password" placeholder="Password" />
          </Input.Group>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header asChild>
          <Card.Title as="h2">Checkbox</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center gap-4 p-4">
            <Input type="checkbox" />
            <Input type="checkbox" defaultChecked />
            <Input type="checkbox" disabled />
            <Input type="checkbox" disabled defaultChecked />
          </div>
        </Card.Content>
        <Card.Header asChild>
          <Card.Title as="h2">Radio</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex justify-center gap-4 p-4">
            <Input name="_demo_radio" type="radio" />
            <Input name="_demo_radio" type="radio" defaultChecked />
            <Input type="radio" disabled />
            <Input type="radio" disabled defaultChecked />
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header asChild>
          <Card.Title as="h2">Select</Card.Title>
        </Card.Header>
        <Card.Content>
          <Select>
            <Select.Option value="apple">Apple</Select.Option>
            <Select.Option value="banana">Banana</Select.Option>
            <Select.Option value="blueberry">Blueberry</Select.Option>
            <Select.Option value="grapes">Grapes</Select.Option>
            <Select.Option value="pineapple">Pineapple</Select.Option>
            <Select.Group>
              <Select.Legend>Vegetables</Select.Legend>
              <Select.Option value="aubergine">Aubergine</Select.Option>
              <Select.Option value="broccoli">Broccoli</Select.Option>
              <Select.Option value="carrot">Carrot</Select.Option>
              <Select.Option value="courgette">Courgette</Select.Option>
              <Select.Option value="leek" disabled>
                Leek
              </Select.Option>
            </Select.Group>
            <Select.Group disabled>
              <Select.Legend>Meat</Select.Legend>
              <Select.Option value="beef">Beef</Select.Option>
              <Select.Option value="chicken">Chicken</Select.Option>
              <Select.Option value="lamb">Lamb</Select.Option>
              <Select.Option value="pork">Pork</Select.Option>
            </Select.Group>
          </Select>
        </Card.Content>
      </Card>
    </>
  );
};
