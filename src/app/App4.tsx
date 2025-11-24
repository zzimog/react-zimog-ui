import { Button, Card, Form, ThemeSwitcher, cn } from '@ui';
import { Select } from './Select';

const App = () => {
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Card>
      <Card.Header className="flex-row justify-between items-center -mt-1.5">
        <Card.Title as="h1">Register</Card.Title>
        <ThemeSwitcher />
      </Card.Header>
      <Card.Content>
        <Form onFormSubmit={handleSubmit}>
          <Form.Field
            name="name"
            label="Name"
            placeholder="Your name"
            autoComplete="off"
          />
          <Form.Field
            name="email"
            label="Email"
            placeholder="Your email"
            pattern={/^\S+@\S+\.\S+$/}
            autoComplete="off"
            required
          >
            <Form.Field.Text>This will be your login.</Form.Field.Text>
            <Form.Field.Invalid>
              Email must be in format <b>username@domain.xx</b>
            </Form.Field.Invalid>
          </Form.Field>
          <Form.Field
            title="Accept the Privacy Policy"
            aria-label="Accept the Privacy Policy"
            aria-describedby="privacy-label"
            name="privacy"
            type="checkbox"
          >
            <Form.Field.Text id="privacy-label" className="leading-6">
              I have read and agree with the{' '}
              <a
                href="#!"
                title="Privacy Policy"
                className={cn(
                  'font-bold',
                  'underline',
                  'underline-offset-2',
                  'text-muted-foreground',
                  'dark:text-muted-background',
                  'hover:text-foreground',
                  'dark:hover:text-background',
                  'rounded-shape',
                  'focusable',
                  'focus-visible:outline-outline',
                  'transition-colors'
                )}
              >
                Privacy Policy
              </a>
              .
            </Form.Field.Text>
          </Form.Field>

          <Select defaultValue="2">
            <Select.Option value="0" label="Hello world!" />
            <Select.OptionsGroup label="Lorem">
              <Select.Option value="1" label="Lorem" />
              <Select.Option value="2" label="Ipsum" />
              <Select.Option value="3" label="Dolor" />
              <Select.Option value="4" label="Sit" disabled />
              <Select.Option value="5" label="Amet" disabled />
            </Select.OptionsGroup>
            <Select.OptionsGroup label="Foo" disabled>
              <Select.Option value="6" label="Foo" />
              <Select.Option value="7" label="Bar" disabled={false} />
            </Select.OptionsGroup>
          </Select>

          <div className="flex justify-end gap-2">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default App;
