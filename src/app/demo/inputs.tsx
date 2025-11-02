import { Star } from 'lucide-react';
import { Button, Input } from '@ui';
import { DemoBox } from './DemoBox';
import { DemoSection } from './DemoSection';

const inputs = (
  <DemoBox id="inputs" title="Inputs">
    <DemoSection title="Text" column>
      <Input name="input_1" placeholder="Empty input" />
      <Input name="input_1" defaultValue="Text input" />
      <Input name="input_2" defaultValue="Disabled" disabled />
      <Input name="input_3" defaultValue="Read only" readOnly />
    </DemoSection>

    <DemoSection title="Prefix & suffix" column>
      <Input.Group>
        <Input.Addon>Px</Input.Addon>
        <Input.Addon>
          <Star />
        </Input.Addon>
        <Input defaultValue="Input group with addons" />
        <Input.Addon>Suffix</Input.Addon>
        <Input.Addon>Suffix 2</Input.Addon>
        <Button color="primary">Button</Button>
      </Input.Group>
    </DemoSection>

    <DemoSection title="Checkbox & radio" column>
      <div className="flex justify-center gap-2 w-full">
        <Input name="check_demo_1" type="checkbox" />
        <Input name="check_demo_2" type="checkbox" defaultChecked />
        <Input name="check_demo_3" type="checkbox" disabled />
        <Input name="check_demo_4" type="checkbox" defaultChecked disabled />
      </div>
      <div className="flex justify-center gap-2 w-full">
        <Input name="radio_demo" type="radio" />
        <Input name="radio_demo" type="radio" defaultChecked />
        <Input name="radio_demo_2" type="radio" disabled />
        <Input name="radio_demo_2" type="radio" defaultChecked disabled />
      </div>
    </DemoSection>
  </DemoBox>
);

export default inputs;
