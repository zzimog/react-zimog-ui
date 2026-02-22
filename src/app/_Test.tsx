import { useId } from 'react';
import { Card, Input } from '@ui';
import { FormField } from './Form';
import { Password } from './Password';

export const _TestPage = () => {
  const id = useId();

  return (
    <Card className="mx-auto w-80">
      <Card.Content>
        <div className="flex flex-col gap-2">
          <FormField.Label>Password</FormField.Label>
          <p className="text-muted [&_a]:text-foreground text-sm [&_a]:underline">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, eum{' '}
            <a href="#">voluptatem</a> quis inventore ipsa.
          </p>
          <Password>
            <Input.Group>
              <Password.Input id={id} />
              <Password.Toggle as={Input.Addon} />
            </Input.Group>
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
        </div>
      </Card.Content>
    </Card>
  );
};
