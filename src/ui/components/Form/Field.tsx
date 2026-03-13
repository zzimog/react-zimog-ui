import { useId, useLayoutEffect, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { FieldControl } from './FieldControl';

const DISPLAY_NAME = 'Field';

interface FieldContextType {
  id: string;
  name?: string;
  descriptionId?: string;
  onDescriptionIdChange(id?: string): void;
}

const [FieldContext, useFieldContext] = createScopedContext<
  Partial<FieldContextType> | undefined
>(DISPLAY_NAME, {});

type BaseProps = NativeProps<'div'>;
interface FieldProps extends BaseProps {
  name?: string;
  direction?: 'horizontal' | 'vertical';
}

export const Field = (inProps: FieldProps) => {
  const { direction = 'vertical', id, name, className, ...props } = inProps;

  const genId = useId();
  const fieldId = id ?? genId;

  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  return (
    <FieldContext
      id={fieldId}
      name={name}
      descriptionId={descriptionId}
      onDescriptionIdChange={setDescriptionId}
    >
      <Native.div
        data-direction={direction}
        {...props}
        className={cn(
          'group/field',
          'flex',
          'flex-col',
          'gap-x-3',
          'gap-y-2',
          'data-[direction=horizontal]:flex-row',
          className
        )}
      />
    </FieldContext>
  );
};

Field.displayName = DISPLAY_NAME;
Field.useContext = useFieldContext;
Field.Control = FieldControl;

/*---------------------------------------------------------------------------*/
// FieldContent
/*---------------------------------------------------------------------------*/

const FieldContent = ({ className, ...props }: NativeProps<'div'>) => (
  <Native.div
    {...props}
    className={cn('grow', 'flex', 'flex-col', 'gap-1', className)}
  />
);

FieldContent.displayName = 'FieldContent';
Field.Content = FieldContent;

/*---------------------------------------------------------------------------*/
// FieldLabel
/*---------------------------------------------------------------------------*/

const LABEL_DISPLAY_NAME = 'FieldLabel';

type FieldBaseProps = NativeProps<'label'>;
interface FieldLabelProps extends FieldBaseProps {}

const FieldLabel = (inProps: FieldLabelProps) => {
  const { id: idProp, className, ...props } = inProps;

  const context = Field.useContext(LABEL_DISPLAY_NAME);
  const id = idProp ?? context.id;

  return (
    <Native.label
      htmlFor={id}
      {...props}
      className={cn(
        'text-sm/6',
        'font-semibold',
        'group-has-disabled/field:opacity-50',
        'group-has-disabled/field:cursor-not-allowed',
        'group-has-aria-invalid/field:text-danger',
        className
      )}
    />
  );
};
FieldLabel.displayName = LABEL_DISPLAY_NAME;
Field.Label = FieldLabel;

/*---------------------------------------------------------------------------*/
// FieldDescription
/*---------------------------------------------------------------------------*/

const DESC_DISPLAY_NAME = 'FieldDescription';

const FieldDescription = (inProps: NativeProps<'p'>) => {
  const { id: idProps, className, ...props } = inProps;

  const genId = useId();
  const id = idProps ?? genId;

  const context = Field.useContext(DESC_DISPLAY_NAME);
  const { descriptionId, onDescriptionIdChange } = context;

  useLayoutEffect(() => {
    onDescriptionIdChange?.(id);

    return () => {
      if (id === descriptionId) {
        onDescriptionIdChange?.(undefined);
      }
    };
  }, [id, descriptionId]);

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

FieldDescription.displayName = DESC_DISPLAY_NAME;
Field.Description = FieldDescription;
