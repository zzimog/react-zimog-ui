import { cn } from '@ui/utils';

export function mergeProps(
  parentProps: Record<string, any>,
  childProps: Record<string, any>
) {
  const overrideProps = { ...childProps };

  for (const prop in childProps) {
    const parentPropValue = parentProps[prop];
    const childPropValue = childProps[prop];

    // merge data-slot values
    if (prop === 'data-slot') {
      overrideProps[prop] = `${parentPropValue} ${childPropValue}`;
    }

    // merge class names
    if (prop === 'className') {
      overrideProps[prop] = cn(parentPropValue, childPropValue);
    }

    // merge styles
    if (prop === 'style') {
      overrideProps[prop] = { ...parentPropValue, ...childPropValue };
    }

    // is an effect handler
    if (/^on[A-Z]/.test(prop)) {
      // merge if exists on both
      if (parentPropValue && childPropValue) {
        overrideProps[prop] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          parentPropValue(...args);

          return result;
        };
      } else if (parentPropValue) {
        overrideProps[prop] = parentPropValue;
      }
    }
  }

  return { ...parentProps, ...overrideProps };
}
