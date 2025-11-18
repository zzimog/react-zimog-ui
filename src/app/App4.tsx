import { Button, Card, cn, ThemeSwitcher } from '@ui';
import { Form } from '../ui/Form';

const App = () => {
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex justify-between items-center -mt-1.5">
          Register
          <ThemeSwitcher />
        </Card.Title>
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
          <Form.Field name="privacy" type="checkbox">
            <Form.Field.Text className="leading-6">
              I have read and agree with the{' '}
              <a
                href="#!"
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
