import { useState } from 'react';
import {
  Card,
  Field,
  Input,
  Menu,
  Password,
  RadioGroup,
  Slider,
  Switch,
  Title,
} from '@ui';

export const TestPage = () => {
  const [sliderValue, setSliderValue] = useState(12);

  return (
    <div className="flex flex-col gap-8">
      <Title>Test page</Title>

      <Field className="mx-auto w-xs">
        <Field.Label>Theme</Field.Label>
        <Field.Control>
          <RadioGroup defaultValue="2" onValueChange={console.log}>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <RadioGroup.Item id="r1" value="light" />
              Light
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <RadioGroup.Item id="r2" value="dark" />
              Dark
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <RadioGroup.Item id="r3" value="system" />
              System
            </label>
          </RadioGroup>
        </Field.Control>
      </Field>

      <Menu className="mx-auto w-xs" open>
        <Menu.Item>Lorem</Menu.Item>
        <Menu.Item>Ipsum</Menu.Item>
        <div role="separator" className="bg-border my-1 h-px w-full"></div>
        <div role="group">
          <Menu.Label>Group Label</Menu.Label>
          <Menu.Item>Lorem</Menu.Item>
          <Menu.Item>Ipsum</Menu.Item>
          <Menu.Item>Dolor</Menu.Item>
          <Menu.Item>Sit</Menu.Item>
        </div>
        <div role="separator" className="bg-border my-1 h-px w-full"></div>
        <Menu.ItemCheckbox>Checkbox</Menu.ItemCheckbox>
      </Menu>

      <Card>
        <Card.Content>
          <Field>
            <Field.Label>Password</Field.Label>
            <Password>
              {/** Input group */}
              <Input.Group>
                {/** Field control */}
                <Field.Control>
                  <Password.Input id="demo-password" />
                </Field.Control>

                {/** Password toggle */}
                <Password.Toggle as={Input.Addon} />
              </Input.Group>

              {/** Requirements */}
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
          </Field>
        </Card.Content>
      </Card>

      <Card>
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
