import { useId, useLayoutEffect } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Field } from './Field';

const DISPLAY_NAME = 'FieldDescription';

type BaseProps = NativeProps<'p'>;
type FieldDescriptionProps = BaseProps

export const FieldDescription = (inProps: FieldDescriptionProps) => {
  const { id: idProps, className, ...props } = inProps;

  const { onDescriptionIdChange } = Field.useContext(DISPLAY_NAME);

  const genId = useId();
  const id = idProps ?? genId;

  useLayoutEffect(() => {
    onDescriptionIdChange?.(id);
  }, [id]);

  return (
    <Native.p
      id={id}
      {...props}
      className={cn(
        'text-sm',
        'text-muted',
        '[&_a]:text-foreground',
        '[&_a]:underline',
        className
      )}
    />
  );
};

FieldDescription.displayName = DISPLAY_NAME;
