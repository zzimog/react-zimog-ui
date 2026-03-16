import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
} from 'react';
import { Field, Input } from '@ui/components';

const DISPLAY_NAME = 'FieldControl';

type InputProps = ComponentPropsWithRef<typeof Input>;
type BaseProps = Omit<InputProps, 'name'>;
interface FieldControlProps extends BaseProps {}

export const FieldControl = (inProps: FieldControlProps) => {
  const { children, ...props } = inProps;

  const { id, name, descriptionId } = Field.useContext(DISPLAY_NAME);

  const inputProps = {
    id,
    name,
    'aria-describedby': descriptionId,
  };

  if (isValidElement(children)) {
    return cloneElement(children, { ...inputProps, ...props });
  }

  return <Input {...inputProps} {...props} />;
};

FieldControl.displayName = DISPLAY_NAME;
