import { Input, Title } from '@ui';
import { DemoBox } from './DemoBox';
import { Star } from 'lucide-react';

const inputs = (
  <DemoBox id="inputs" title="Inputs">
    <Title size={2}>Text</Title>
    <Input name="input_1" defaultValue="Text input" />
    <Input name="input_2" placeholder="Disabled" disabled />
    <Input name="input_3" defaultValue="Read only" readOnly />

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
  </DemoBox>
);

export default inputs;
