import {
  createElement,
  isValidElement,
  useEffect,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react';
import type { ClassValue } from 'clsx';
import { cn } from '@ui';
import { MDXLoader } from './MDXLoader';

function createId(children: ReactNode) {
  let str = '';

  if (typeof children === 'string') {
    str = children;
  }
  if (Array.isArray(children)) {
    str = children.map(createId).flat().filter(Boolean).join('');
  }
  if (isValidElement(children) && !!(children.props as any).children) {
    str = createId(children);
  }

  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
}

export function createMDXElement<T extends ElementType>(
  tag: T,
  classNames?: ClassValue
) {
  const DISPLAY_NAME = 'MDXElement';

  const MDXElement = (inProps: ComponentPropsWithoutRef<T>) => {
    const { id: idProp, className, ...props } = inProps;

    const isTitle = /^h1$/i.test(tag as string);
    const { baseId, onBaseIdChange } = MDXLoader.useContext(DISPLAY_NAME);

    let id = idProp;
    const tagName = tag as string;
    const isH = /^h[1-6]$/i.test(tagName);
    if (isH) {
      id = idProp ?? createId(props.children);

      const isSubtitle = /^h[2-6]$/i.test(tagName);
      if (isSubtitle && baseId) {
        id = `${baseId}-${id}`;
      }
    }

    useEffect(() => {
      if (isTitle && !baseId) {
        onBaseIdChange(id);
      }
    }, [isTitle, baseId, id]);

    return createElement(tag, {
      id,
      ...props,
      className: cn(classNames, className),
    });
  };

  MDXElement.displayName = DISPLAY_NAME;
  return MDXElement;
}
