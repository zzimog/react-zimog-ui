import { Home } from 'lucide-react';
import {
  type ButtonColor,
  type ButtonVariant,
  Button,
  ButtonGroup,
  capitalize,
} from '@ui';
import { DemoBox } from './DemoBox';
import { DemoSection } from './DemoSection';

const buttonColors: ButtonColor[] = [
  'default',
  'primary',
  'secondary',
  'danger',
];

const buttonVariants: ButtonVariant[] = [
  'solid',
  'outlined',
  'dashed',
  'ghost',
];

const buttons = (
  <DemoBox id="buttons" title="Buttons">
    <DemoSection title="Sizes">
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
    </DemoSection>

    <DemoSection title="Variants">
      {buttonColors.map((color, key) => (
        <ButtonGroup key={key} color={color} direction="col">
          {buttonVariants.map((variant, key) => (
            <Button key={key} variant={variant}>
              {`${capitalize(color)} ${variant}`}
            </Button>
          ))}
        </ButtonGroup>
      ))}
    </DemoSection>

    <DemoSection title="Icons" column>
      <ButtonGroup>
        <Button icon={<Home />} size="sm" />
        <Button icon={<Home />} size="md" />
        <Button icon={<Home />} size="lg" />
      </ButtonGroup>
      <ButtonGroup>
        <Button icon={<Home />} size="sm">
          Home
        </Button>
        <Button icon={<Home />} size="md">
          Home
        </Button>
        <Button icon={<Home />} size="lg">
          Home
        </Button>
      </ButtonGroup>
    </DemoSection>

    <DemoSection title="Loading" column>
      <ButtonGroup size="sm">
        <Button loading />
        <Button loading>Loading</Button>
      </ButtonGroup>
      <ButtonGroup color="primary">
        <Button loading />
        <Button loading>Loading</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button loading />
        <Button loading>Loading</Button>
      </ButtonGroup>
    </DemoSection>

    <DemoSection title="Groups" column>
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
    </DemoSection>
  </DemoBox>
);

export default buttons;
