import { Star } from 'lucide-react';
import { Input } from '@ui';
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
      <Input name="input_4" defaultValue="With prefix" prefix="Px" />
      <Input name="input_5" defaultValue="With suffix" suffix="Sx" />
      <Input
        name="input_6"
        defaultValue="With both"
        prefix={<Star />}
        suffix="Sx"
      />
      <Input
        name="input_7"
        defaultValue="With both (but disabled)"
        prefix={<Star />}
        suffix="Sx"
        disabled
      />
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
