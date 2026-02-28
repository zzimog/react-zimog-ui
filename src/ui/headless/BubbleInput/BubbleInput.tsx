import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { useMergedRefs } from '@ui/hooks';

const DISPLAY_NAME = 'BubbleInput';

type BubbleInputProps = ComponentPropsWithRef<'input'>;

export const BubbleInput = (inProps: BubbleInputProps) => {
  const { ref: refProp, value, ...props } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const prevRef = useRef(value);
  const prev = prevRef.current;

  useEffect(() => {
    prevRef.current = prev;
  }, [value]);

  useEffect(() => {
    const node = ref.current;
    if (node && value !== prev) {
      const Input = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ) as PropertyDescriptor;

      Input.set?.call(node, value);
      node.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, [value, prev]);

  return <input ref={mergedRef} defaultValue={value} {...props} />;
};

BubbleInput.displayName = DISPLAY_NAME;
