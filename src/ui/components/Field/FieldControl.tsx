import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ReactElement,
} from 'react';
import { Field, Input } from '@ui/components';

const DISPLAY_NAME = 'FieldControl';

type InputProps = ComponentPropsWithRef<typeof Input>;
type BaseProps = Omit<InputProps, 'id' | 'name' | 'children'>;
interface FieldControlProps extends BaseProps {
  children?: ReactElement;
}

export const FieldControl = (inProps: FieldControlProps) => {
  const { children, ...props } = inProps;

  const context = Field.useContext(DISPLAY_NAME);
  const { id, name, descriptionId } = context;

  const inputProps = {
    id,
    name,
    'aria-describedby': descriptionId,
  };

  if (children) {
    if (isValidElement(children)) {
      const child = Children.only(children);
      const childProps = child.props as Record<string, unknown>;
      return cloneElement(child, { ...childProps, ...inputProps, ...props });
    }

    throw new Error(
      `${DISPLAY_NAME} can only accept a single ReactElement as a child, or no children at all.`
    );
  }

  return <Input {...inputProps} {...props} />;
};

FieldControl.displayName = DISPLAY_NAME;
