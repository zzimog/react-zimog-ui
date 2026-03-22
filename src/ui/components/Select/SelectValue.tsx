import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectValue';

type BaseProps = NativeProps<'span'>;
type SelectValueProps = BaseProps & {
  placeholder?: string;
};

export const SelectValue = (inProps: SelectValueProps) => {
  const {
    ref: refProp,
    placeholder = '—',
    className,
    style,
    children,
    ...props
  } = inProps;

  const { value, onValueNodeChange } = Select.useContext(DISPLAY_NAME);

  const mergedRef = useMergedRefs(refProp, onValueNodeChange);
  const hasPlaceholder = !value || value === '';

  return (
    <Native.span
      ref={mergedRef}
      data-placeholder={hasPlaceholder ? '' : undefined}
      {...props}
      className={cn(classes.value, className)}
      style={{
        pointerEvents: 'none',
        ...style,
      }}
    >
      {hasPlaceholder ? placeholder : children}
    </Native.span>
  );
};

SelectValue.displayName = DISPLAY_NAME;
