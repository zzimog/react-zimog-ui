import { useId, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { FieldContent } from './FieldContent';
import { FieldControl } from './FieldControl';
import { FieldDescription } from './FieldDescription';
import { FieldLabel } from './FieldLabel';

const DISPLAY_NAME = 'Field';

interface FieldContextType {
  id: string;
  name?: string;
  descriptionId?: string;
  onDescriptionIdChange(id?: string): void;
}

const [FieldContext, useFieldContext] = createScopedContext<
  FieldContextType | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
interface FieldProps extends BaseProps {
  name?: string;
  direction?: 'horizontal' | 'vertical';
}

export const Field = (inProps: FieldProps) => {
  const { direction = 'vertical', id, name, className, ...props } = inProps;

  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const genId = useId();
  const fieldId = id ?? genId;

  return (
    <FieldContext
      id={fieldId}
      name={name}
      descriptionId={descriptionId}
      onDescriptionIdChange={setDescriptionId}
    >
      <Native.div
        role="group"
        data-direction={direction}
        {...props}
        className={cn(
          '@container/field',
          'group/field',
          'flex',
          'flex-col',
          'gap-3',
          'data-[direction=horizontal]:flex-row',
          className
        )}
      />
    </FieldContext>
  );
};

Field.displayName = DISPLAY_NAME;
Field.useContext = useFieldContext;
Field.Label = FieldLabel;
Field.Control = FieldControl;
Field.Description = FieldDescription;
Field.Content = FieldContent;

/*---------------------------------------------------------------------------*/
// FieldSet
/*---------------------------------------------------------------------------*/

const FieldSet = ({ className, ...props }: NativeProps<'fieldset'>) => (
  <Native.fieldset
    {...props}
    className={cn(
      'flex',
      'flex-col',
      'gap-4',
      '-mx-4',
      'my-2',
      'p-4',
      'border',
      'rounded-shape',
      'bg-background/50',
      'transition',
      className
    )}
  />
);

FieldSet.displayName = 'FieldSet';
Field.Set = FieldSet;

/*---------------------------------------------------------------------------*/
// FieldLegend
/*---------------------------------------------------------------------------*/

const FieldLegend = ({ className, ...props }: NativeProps<'legend'>) => (
  <Native.legend {...props} className={cn('font-semibold', className)} />
);

FieldLegend.displayName = 'FieldLegend';
Field.Legend = FieldLegend;
