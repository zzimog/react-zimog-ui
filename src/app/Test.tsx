import { useId } from 'react';
import { Card, Input } from '@ui';
import { FormField } from './Form';
import { Password } from './Password';
import { Select } from './Select';

export const TestPage = () => {
  return (
    <>
      <Select>
        <Select.Content>
          <Select.Item value="1">Test 1</Select.Item>
          <Select.Item value="2">Test 2</Select.Item>
          <Select.Item value="3">Test 3</Select.Item>
          <Select.Item value="4" disabled>
            Test 4
          </Select.Item>
          <Select.Item value="5">Test 5</Select.Item>
        </Select.Content>
      </Select>
      <Select>
        <Select.Content>
          <Select.Item value="a">Lorem a</Select.Item>
          <Select.Item value="b">Lorem b</Select.Item>
          <Select.Item value="c">Lorem c</Select.Item>
        </Select.Content>
      </Select>
    </>
  );
};

export const __TestPage = () => {
  return (
    <Card className="mx-auto w-80">
      <Card.Content className="flex flex-col gap-8">
        <FormField>
          <FormField.Label>Password</FormField.Label>
          <FormField.Input asChild>
            <div />
          </FormField.Input>
          <FormField.Description>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, eum{' '}
            <a href="#">voluptatem</a> quis inventore ipsa.
          </FormField.Description>
        </FormField>

        <FormField className="flex-row">
          <FormField.Input type="checkbox" />
          <div className="flex flex-col gap-2">
            <FormField.Label>Lorem</FormField.Label>
          </div>
        </FormField>
      </Card.Content>
    </Card>
  );
};

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
