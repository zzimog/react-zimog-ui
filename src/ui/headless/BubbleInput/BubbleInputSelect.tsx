import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';

const DISPLAY_NAME = 'BubbleInputSelect';

type BaseSelectProps = ComponentPropsWithoutRef<'select'>;
type BaseProps = Omit<BaseSelectProps, 'defaultValue'>;
type BubbleInputSelectProps = BaseProps;

export const BubbleInputSelect = (inProps: BubbleInputSelectProps) => {
  const { value, style, ...props } = inProps;

  const ref = useRef<HTMLSelectElement>(null);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const node = ref.current;
    const previousValue = previousValueRef.current;
    if (node && value !== previousValue) {
      const { prototype } = HTMLSelectElement;
      const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
      const setValue = descriptor?.set;

      if (setValue) {
        setValue.call(node, value);
        node.dispatchEvent(
          new Event('change', {
            bubbles: true,
            cancelable: true,
          })
        );
      }

      previousValueRef.current = value;
    }
  }, [value]);

  return (
    <select
      ref={ref}
      defaultValue={value}
      {...props}
      style={{
        display: 'none',
        ...style,
      }}
    />
  );
};

BubbleInputSelect.displayName = DISPLAY_NAME;
