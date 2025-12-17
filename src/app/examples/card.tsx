import { Button, Card, Input } from '@ui';
import { DemoContainer } from '../components/demo-container';

const code = `// Example code
import { Card } from '@ui';

export default () => (
  <Card>
    <Card.Header>
      <Card.Title>Card title</Card.Title>
      <Card.Description>Card description</Card.Description>
    </Card.Header>
    <Card.Content>
      <p>Card content</p>
    </Card.Content>
    <Card.Footer>
      <p>Card.Footer</p>
    </Card.Footer>
  </Card>
);`;

export const CardDemo = () => (
  <DemoContainer title="Card" code={code}>
    <Card className="max-w-sm">
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>
          Log in to your account, or create a new one!
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm/6 font-bold">
            Username
          </label>
          <Input id="username" autoComplete="off" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm/6 font-bold">
            Password
          </label>
          <Input id="password" type="password" autoComplete="off" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button color="primary" className="self-end">
          Login
        </Button>
      </Card.Footer>
    </Card>
  </DemoContainer>
);
