import {
  type ButtonColor,
  type ButtonVariant,
  Title,
  Button,
  ButtonGroup,
  capitalize,
} from '@ui';
import { DemoBox } from './DemoBox';

const buttons = (
  <DemoBox id="buttons" title="Buttons">
    <Title size={2}>Sizes</Title>
    <div className="w-full flex justify-center items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
    </div>

    <Title size={2}>Variants</Title>
    <div className="w-full flex justify-center gap-2">
      {['default', 'primary', 'secondary', 'danger'].map((color, index) => (
        <ButtonGroup key={index} color={color as ButtonColor} direction="col">
          {['solid', 'outlined', 'dashed', 'ghost'].map((variant, index) => (
            <Button key={index} variant={variant as ButtonVariant}>
              {capitalize(color)} {variant}
            </Button>
          ))}
        </ButtonGroup>
      ))}
    </div>

    <Title size={2}>Groups</Title>
    <div className="w-full flex flex-col items-center gap-2">
      <ButtonGroup>
        <Button>Buttons...</Button>
        <Button>...group</Button>
      </ButtonGroup>
      <ButtonGroup size="sm" color="primary" joined>
        <Button>Small...</Button>
        <Button color="secondary">...joined...</Button>
        <Button color="danger">...buttons</Button>
      </ButtonGroup>
      <ButtonGroup color="primary" joined disabled>
        <Button>Disabled...</Button>
        <Button>...joined...</Button>
        <Button>...buttons</Button>
      </ButtonGroup>
    </div>
  </DemoBox>
);

export default buttons;
