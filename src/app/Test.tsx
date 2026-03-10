import { useState } from 'react';
import { Card, Field, Input, Password, Slider, Switch, Title } from '@ui';

export const TestPage = () => {
  const [sliderValue, setSliderValue] = useState(15);

  return (
    <div className="flex flex-col gap-8">
      <Title>Test page</Title>

      <Card>
        <Card.Header>
          <Card.Title as="h2">Password</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-col gap-2">
            <Field.Label htmlFor="demo-password">Password</Field.Label>
            <p className="text-muted [&_a]:text-foreground text-sm [&_a]:underline">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, eum{' '}
              <a href="#">voluptatem</a> quis inventore ipsa.
            </p>

            <Password>
              <Input.Group>
                <Password.Input id="demo-password" />
                <Password.Toggle as={Input.Addon} />
              </Input.Group>
              <Password.Requirement pattern={/[a-z]/}>
                One lowercase character
              </Password.Requirement>
              <Password.Requirement pattern={/[A-Z]/}>
                One uppercase character
              </Password.Requirement>
              <Password.Requirement pattern={/[0-9]/}>
                One number
              </Password.Requirement>
              <Password.Requirement pattern={/[!?@#]/}>
                One special character (!?@#)
              </Password.Requirement>
            </Password>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title as="h2">Radio</Card.Title>
        </Card.Header>
        <Card.Content className="flex justify-center gap-4">
          <Input name="_demo_radio" type="radio" />
          <Input name="_demo_radio" type="radio" defaultChecked />
          <Input type="radio" disabled />
          <Input type="radio" disabled defaultChecked />
        </Card.Content>

        <Card.Header>
          <Card.Title as="h2">Switch</Card.Title>
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

      <Card>
        <Card.Header>
          <Card.Title as="h2">Slider</Card.Title>
        </Card.Header>
        <Card.Content className="flex items-center justify-center gap-8">
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
      </Card>
    </div>
  );
};
