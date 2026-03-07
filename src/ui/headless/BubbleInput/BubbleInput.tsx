import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';

const DISPLAY_NAME = 'BubbleInput';

type BubbleInputProps = ComponentPropsWithRef<'input'>;

export const BubbleInput = (inProps: BubbleInputProps) => {
  const { ref: refProp, type, value, checked, style, ...props } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const isCheckable = type === 'checkbox' || type === 'radio';
  const propName = isCheckable ? 'checked' : 'value';
  const propValue = isCheckable ? checked : value;

  const prevRef = useRef(propValue);
  const prev = prevRef.current;

  useEffect(() => {
    prevRef.current = propValue;
  }, [propValue]);

  useEffect(() => {
    const node = ref.current;
    if (node && propValue !== prev) {
      const Property = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        propName
      ) as PropertyDescriptor;

      Property.set?.call(node, propValue);
      node.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, [propName, propValue, prev]);

  return (
    <input
      ref={mergedRef}
      type={type}
      defaultValue={propValue as string}
      defaultChecked={propValue as boolean}
      {...props}
      style={{
        display: 'none',
        ...style,
      }}
    />
  );
};

BubbleInput.displayName = DISPLAY_NAME;
