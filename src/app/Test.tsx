import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { Card, CodeBlock, Input, Select, Slider, Title } from '@ui';

const CODE_INPUT = `
import { Input } from '@ui';

export default () => (
  <Input />
);`;

const CODE_SELECT = `
import { Select } from '@ui';

export default () => (
  <Select>
    <Select.Option />
    <Select.Group>
      <Select.Legend />
      <Select.Option />
    </Select.Group>
  </Select>
);`;

const CODE_SLIDER = `
import { Slider } from '@ui';

export default () => (
  <Slider>
    <Slider.Track>
      <Slider.Steps />
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider>
);`;

export const TestPage = () => {
  const [sliderValue, setSliderValue] = useState(15);

  return (
    <>
      <header>
        <Title>Form Elements</Title>
        <ol className="list-decimal p-4">
          <li>
            <a href="#input" className="hover:underline">
              Input
            </a>
          </li>
          <li>
            <a href="#select" className="hover:underline">
              Select
            </a>
          </li>
          <li>
            <a href="#slider" className="hover:underline">
              Slider
            </a>
          </li>
        </ol>
      </header>

      <Title id="input" size={2}>
        Input
      </Title>
      <Card>
        <Card.Header asChild>
          <Card.Title as="h3">Standard</Card.Title>
        </Card.Header>
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

        <Card.Header asChild>
          <Card.Title as="h3">Checkbox</Card.Title>
        </Card.Header>
        <Card.Content className="flex justify-center gap-4">
          <Input type="checkbox" />
          <Input type="checkbox" defaultChecked />
          <Input type="checkbox" disabled />
          <Input type="checkbox" disabled defaultChecked />
        </Card.Content>

        <Card.Header asChild>
          <Card.Title as="h3">Radio</Card.Title>
        </Card.Header>
        <Card.Content className="flex justify-center gap-4">
          <Input name="_demo_radio" type="radio" />
          <Input name="_demo_radio" type="radio" defaultChecked />
          <Input type="radio" disabled />
          <Input type="radio" disabled defaultChecked />
        </Card.Content>

        <Card.Header asChild>
          <Card.Title as="h3">Code</Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <CodeBlock>{CODE_INPUT.trim()}</CodeBlock>
        </Card.Content>
      </Card>

      <Title id="select" size={2}>
        Select
      </Title>
      <Card>
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

        <Card.Header asChild>
          <Card.Title as="h3">Code</Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <CodeBlock>{CODE_SELECT.trim()}</CodeBlock>
        </Card.Content>
      </Card>

      <Title id="slider" size={2}>
        Slider
      </Title>
      <Card>
        <Card.Content className="mx-auto flex items-center justify-center gap-8">
          <Slider
            min={10}
            max={20}
            step={1}
            value={sliderValue}
            className="w-full max-w-60"
            onValueChange={setSliderValue}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log('[Change] Value:', target.value);
            }}
          >
            <Slider.Track>
              <Slider.Steps />
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>

          <Slider
            min={10}
            max={20}
            step={1}
            direction="vertical"
            value={sliderValue}
            className="min-h-40"
            onValueChange={setSliderValue}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log('[Change] Value:', target.value);
            }}
          >
            <Slider.Track>
              <Slider.Steps />
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Card.Content>

        <Card.Header asChild>
          <Card.Title as="h3">Code</Card.Title>
        </Card.Header>
        <Card.Content className="p-0">
          <CodeBlock>{CODE_SLIDER.trim()}</CodeBlock>
        </Card.Content>
      </Card>
    </>
  );
};
