import { cn } from '@ui/utils';

export function mergeProps(
  nativeProps: Record<string, any>,
  childProps: Record<string, any>
) {
  const props = { ...childProps };

  for (const prop in childProps) {
    const nativePropValue = nativeProps[prop];
    const childPropValue = childProps[prop];

    // is an effect handler
    if (/^on[A-Z]/.test(prop)) {
      // merge if exists on both
      if (nativePropValue && childPropValue) {
        props[prop] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          nativePropValue(...args);

          return result;
        };
      } else if (nativePropValue) {
        props[prop] = nativePropValue;
      }
    }

    // merge class names
    if (prop === 'className') {
      props[prop] = cn(nativePropValue, childPropValue);
    }

    // merge styles
    if (prop === 'style') {
      props[prop] = { ...nativePropValue, ...childPropValue };
    }
  }

  return { ...nativeProps, ...props };
}
