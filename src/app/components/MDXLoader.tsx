import type { PropsWithChildren } from 'react';
import type { MDXComponents, MDXContent } from 'mdx/types';
import { Card, cn, Code, CodeBlock } from '@ui';
import * as UIComponents from '@ui';

interface MDXLoaderProps {
  mdx: MDXContent;
  components?: MDXComponents;
}

export const MDXLoader = ({ mdx: Mdx, components }: MDXLoaderProps) => (
  <Mdx
    components={{
      h1: ({ className, ...props }) => (
        <h1
          {...props}
          className={cn('mb-8 text-4xl/none font-bold', className)}
        />
      ),
      h2: ({ className, ...props }) => (
        <h2
          {...props}
          className={cn('mt-16 mb-4 text-xl/none font-semibold', className)}
        />
      ),
      h3: ({ className, ...props }) => (
        <h3
          {...props}
          className={cn('mt-4 mb-2 text-lg/none font-semibold', className)}
        />
      ),
      p: ({ className, ...props }) => (
        <p
          {...props}
          className={cn('text-muted mb-6 leading-relaxed', className)}
        />
      ),
      code: (props: any) =>
        !props.className ? <Code {...props} /> : <code {...props} />,
      pre: (props: PropsWithChildren) => (
        <Card data-mdx="pre" className="rounded-t-none border-t-0">
          <CodeBlock {...props} className="-my-6" />
        </Card>
      ),
      Demo: ({ children }: PropsWithChildren) => (
        <Card data-mdx="Demo" className="rounded-b-none">
          <Card.Content>{children}</Card.Content>
        </Card>
      ),
      ...(UIComponents as any),
      ...components,
    }}
  />
);

MDXLoader.displayName = 'MDXLoader';
