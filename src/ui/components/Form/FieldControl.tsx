import { type ComponentPropsWithRef } from 'react';
import { Field, Input } from '@ui/components';

const DISPLAY_NAME = 'FieldControl';

type InputProps = ComponentPropsWithRef<typeof Input>;
type BaseProps = Omit<InputProps, 'name'>;
interface FieldControlProps extends BaseProps {}

export const FieldControl = (inProps: FieldControlProps) => {
  const { ...props } = inProps;

  const { id, name, descriptionId } = Field.useContext(DISPLAY_NAME);

  return (
    <Input id={id} name={name} aria-describedby={descriptionId} {...props} />
  );
};

FieldControl.displayName = DISPLAY_NAME;
