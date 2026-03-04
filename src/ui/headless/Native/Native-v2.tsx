import type { ComponentPropsWithRef, ElementType, JSX } from 'react';

type BaseProps<T extends ElementType> = Omit<ComponentPropsWithRef<T>, 'as'>;
export type NativeProps<T extends ElementType> = BaseProps<T> & {
  as?: T;
  asChild?: boolean;
};

/**
 * @todo Implement `asChild` attribute
 */
function createNativeElement<T extends ElementType>(tag: T) {
  const Native = <E extends ElementType = T>(inProps: NativeProps<E>) => {
    const { as, asChild, ...props } = inProps;
    const Comp: any = as || tag;

    if (asChild) {
      return null;
    }

    return <Comp {...props} />;
  };

  Native.displayName = `Native.${tag}`;
  return Native;
}

type NativeFactory = {
  [Tag in keyof JSX.IntrinsicElements]: <T extends ElementType = Tag>(
    props: NativeProps<T>
  ) => JSX.Element;
};

export const Native = new Proxy({} as NativeFactory, {
  get(cache, tag: keyof NativeFactory) {
    if (tag in cache) {
      return cache[tag];
    }

    return createNativeElement(tag);
  },
});

export const Test = (
  <>
    <Native.a href="#">This will be rendered natively as `a` element</Native.a>

    <Native.div as="a" href="#">
      This should be rendered as `a` and should accept `href` attribute
    </Native.div>

    {/* @ts-expect-error */}
    <Native.div href="#">
      This will throw an error on `href` attribute if @ts-expect-error comment
      is removed
    </Native.div>

    {/* @ts-expect-error */}
    <Native.a as="div" href="#">
      This will be rendered as `div` element and throw an error on `href`
      attribute if @ts-expect-error comment is removed
    </Native.a>
  </>
);
