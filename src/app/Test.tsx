import { useState } from 'react';
import { Card, CodeBlock, Input, Slider, Switch, Title } from '@ui';

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
    <div className="flex flex-col gap-8">
      <Title>Form Elements</Title>

      <Card>
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
          <Card.Title as="h3">Switch</Card.Title>
        </Card.Header>
        <Card.Content className="flex justify-center gap-2">
          <Switch
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log('[Change] Checked:', target.checked);
            }}
          />
          <Switch
            defaultChecked
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log('[Change] Checked:', target.checked);
            }}
          />
          <Switch disabled />
          <Switch disabled defaultChecked />
        </Card.Content>
      </Card>

      <Title id="slider" size={2}>
        Slider
      </Title>
      <Card>
        <Card.Content className="flex items-center justify-center gap-8 border-b">
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

        <CodeBlock className="-my-6">{CODE_SLIDER.trim()}</CodeBlock>
      </Card>
    </div>
  );
};
