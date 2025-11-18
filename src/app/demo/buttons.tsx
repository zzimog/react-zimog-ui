import { Home } from 'lucide-react';
import { type ButtonColor, type ButtonVariant, Button, capitalize } from '@ui';
import { DemoBox } from './DemoBox';
import { DemoSection } from './DemoSection';

const buttonColors: ButtonColor[] = ['default', 'primary', 'danger'];

const buttonVariants: ButtonVariant[] = ['solid', 'outlined', 'ghost'];

const buttons = (
  <DemoBox id="buttons" title="Buttons">
    <DemoSection title="Sizes">
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
    </DemoSection>

    <DemoSection title="Variants">
      {buttonColors.map((color, key) => (
        <Button.Group key={key} color={color} column>
          {buttonVariants.map((variant, key) => (
            <Button key={key} variant={variant}>
              {`${capitalize(color)} ${variant}`}
            </Button>
          ))}
        </Button.Group>
      ))}
    </DemoSection>

    <DemoSection title="Icons" column>
      <Button.Group>
        <Button icon={<Home />} size="sm" />
        <Button icon={<Home />} size="md" />
        <Button icon={<Home />} size="lg" />
      </Button.Group>
      <Button.Group>
        <Button icon={<Home />} size="sm">
          Home
        </Button>
        <Button icon={<Home />} size="md">
          Home
        </Button>
        <Button icon={<Home />} size="lg">
          Home
        </Button>
      </Button.Group>
    </DemoSection>

    <DemoSection title="Loading" column>
      <Button.Group size="sm">
        <Button loading />
        <Button loading>Loading</Button>
      </Button.Group>
      <Button.Group color="primary">
        <Button loading />
        <Button loading>Loading</Button>
      </Button.Group>
      <Button.Group size="lg">
        <Button loading />
        <Button loading>Loading</Button>
      </Button.Group>
    </DemoSection>

    <DemoSection title="Groups" column>
      <Button.Group>
        <Button>Buttons...</Button>
        <Button>...group</Button>
      </Button.Group>
      <Button.Group size="sm" color="primary" joined>
        <Button>Small...</Button>
        <Button color="default">...joined...</Button>
        <Button color="danger">...buttons</Button>
      </Button.Group>
      <Button.Group color="primary" joined disabled>
        <Button>Disabled...</Button>
        <Button>...joined...</Button>
        <Button>...buttons</Button>
      </Button.Group>
    </DemoSection>
  </DemoBox>
);

export default buttons;
