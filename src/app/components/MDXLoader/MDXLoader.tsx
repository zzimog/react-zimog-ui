import type { MDXComponents, MDXContent } from 'mdx/types';
import { cn, Code, CodeBlock } from '@ui';
import { createHeading } from './create-heading';

interface MDXLoaderProps {
  mdx: MDXContent;
  components?: MDXComponents;
}

export const MDXLoader = ({ mdx: Mdx, components }: MDXLoaderProps) => (
  <Mdx
    components={{
      h1: ({ className, ...props }) =>
        createHeading('h1', {
          ...props,
          className: cn('mb-16 text-3xl/none font-semibold', className),
        }),
      h2: ({ className, children, ...props }) => {
        const isString = typeof children === 'string';
        const isHidden = isString && children.startsWith?.('~');
        const content = isHidden ? children.slice(1) : children;
        return (
          <h2
            {...props}
            className={cn(
              'text-xl/none',
              'mb-4',
              isHidden && 'sr-only',
              className
            )}
            children={content}
          />
        );
      },
      h3: ({ className, ...props }) => (
        <p {...props} className={cn('text-muted', 'mb-8', className)} />
      ),
      p: ({ className, ...props }) => (
        <p {...props} className={cn('text-muted', className)} />
      ),
      pre: ({ className, ...props }) => (
        <CodeBlock {...props} className={cn('-my-6', className)} />
      ),
      code: Code,
      ...components,
    }}
  />
);

MDXLoader.displayName = 'MDXLoader';
