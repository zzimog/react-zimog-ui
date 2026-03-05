import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ComponentPropsWithRef,
  type ElementType,
  type JSX,
} from 'react';
import { useMergedRefs } from '@ui/hooks';
import { mergeProps } from './merge-props';
import { tags } from './tags';

type BaseProps<T extends ElementType> = Omit<ComponentPropsWithRef<T>, 'as'>;
export type NativeProps<T extends ElementType> = BaseProps<T> & {
  as?: ElementType;
  asChild?: boolean;
};

function createNativeElement<T extends ElementType>(tag: T) {
  const Native = <E extends ElementType = T>(inProps: NativeProps<E>) => {
    const { as, asChild, ...props } = inProps;
    const Comp: any = as || tag;

    if (asChild) {
      const { ref, children, ...parentProps } = props;

      if (isValidElement(children)) {
        const child = Children.only(children);
        const childProps = child.props as Record<string, any>;
        const mergedProps = mergeProps(parentProps, childProps);

        if (children.type !== Fragment) {
          mergedProps.ref = ref
            ? useMergedRefs(ref, childProps.ref)
            : childProps.ref;
        }

        return cloneElement(child, mergedProps);
      }

      throw new Error('`asChild` attribute requires a single child element');
    }
    return <Comp {...props} />;
  };

  Native.displayName = `Native.${tag}`;
  return Native;
}

type NativeFactory = {
  [Tag in (typeof tags)[number]]: <T extends ElementType = Tag>(
    props: NativeProps<T>
  ) => JSX.Element;
};

export const Native = tags.reduce(
  (tags, tag) => ({
    ...tags,
    [tag]: createNativeElement(tag),
  }),
  {} as NativeFactory
);
